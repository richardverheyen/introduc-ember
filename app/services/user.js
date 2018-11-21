import Service from '@ember/service';

import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Service.extend({
  store: service(),
  router: service(),
  sessionUser: null,
  name: null,
  tagline: null,
  lat: null,
  lng: null,

  checkLocalStorageForAccount() {
    const storedUser = JSON.parse(window.localStorage.getItem('storedUser'));
    const storedName = storedUser.name;
    const storedTagline = storedUser.tagline;

    if (
      !storedUser ||
      typeof storedUser.name !== 'string' ||
      typeof storedUser.tagline !== 'string'
    ) {
      this.transitionToWelcomePage();
    } else {
      this.set('name', storedName);
      this.set('tagline', storedTagline);
      this.postUserToApi.perform(storedName, storedTagline);
    }
  },

  transitionToWelcomePage() {
    this.router.replaceWith('welcome');
  },

  postUserToApi: task(function*(name, tagline) {
    const callback = (lat, lng) => {
      this.saveUser.perform(name, tagline, lat, lng);
      this.startUpdateLocationLoop.perform();
      this.router.transitionTo('index');
    };

    yield this.fetchCoords.perform(callback);
  }),

  fetchCoords: task(function*(callback) {
    yield navigator.geolocation.getCurrentPosition(pos => {
      callback(pos.coords.latitude, pos.coords.longitude);
    });
  }),

  saveUser: task(function*(name, tagline, lat, lng) {
    window.localStorage.setItem(
      'storedUser',
      JSON.stringify({
        name: name,
        tagline: tagline
      })
    );

    const user = this.store.createRecord('user', {
      name: name,
      tagline: tagline,
      lat: lat,
      lng: lng
    });

    this.set('sessionUser', user);
    yield user.save();
  }),

  startUpdateLocationLoop: task(function*() {
    const fiveSeconds = 5 * 1000;
    while (true) {
      console.log('updating location');
      this.sessionUser.setProperties({
        lat: this.lat,
        lng: this.lng
      });

      yield this.sessionUser.save();
      yield timeout(fiveSeconds);
    }
  }).restartable()
});
