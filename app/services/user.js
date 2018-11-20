import Service from '@ember/service';

import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Service.extend({
  store: service(),
  router: service(),
  storedUser: null,
  sessionUser: null,
  lat: null,
  lng: null,

  checkLocalStorageForAccount() {
    const storedUser = JSON.parse(window.localStorage.getItem('storedUser'));

    if (
      !storedUser ||
      typeof storedUser.name !== 'string' ||
      typeof storedUser.tagline !== 'string'
    ) {
      this.transitionToWelcomePage();
    } else {
      this.set('storedUser', storedUser);
      this.postUserToApi.perform(storedUser);
    }
  },

  transitionToWelcomePage() {
    this.router.replaceWith('welcome');
  },

  postUserToApi: task(function*(storedUser) {
    if (!this.lat || !this.lng) {
      console.error(
        'attempted to post a user but there was no coordinates available'
      );
      return;
    }

    storedUser.lat = this.lat;
    storedUser.lng = this.lng;
    console.log('posting user:', storedUser);

    const user = this.store.createRecord('user', storedUser);
    yield user.save();
    this.set('sessionUser', user);
    // this.startUpdateLocationLoop.perform();
    this.router.transitionTo('index');
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
