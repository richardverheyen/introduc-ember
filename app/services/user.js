import Service from '@ember/service';

import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Service.extend({
  store: service(),
  router: service(),
  sessionUser: null,
  name: null,
  tagline: null,

  createAccountFromWelcomeRoute: task(function*(storedName, storedTagline) {
    yield this.createUser.perform(storedName, storedTagline);
    yield this.transitionToIndexPage.perform();
  }),

  createUser: task(function*(name, tagline) {
    window.localStorage.setItem(
      'storedUser',
      JSON.stringify({
        name: name,
        tagline: tagline
      })
    );

    const user = this.store.createRecord('user', {
      name: name,
      tagline: tagline
    });

    this.set('sessionUser', user);
    yield user.save();
  }),

  transitionToIndexPage: task(function*() {
    yield this.router.replaceWith('/');
  }),

  fetchCoords: task(function*(callback) {
    yield navigator.geolocation.getCurrentPosition(pos => {
      callback(pos.coords.latitude, pos.coords.longitude);
    });
  }),

  startUpdateLocationLoop: task(function*() {
    const fiveSeconds = 5 * 1000;
    while (true) {
      const callback = (lat, lng) => {
        this.sessionUser.setProperties({
          lat: lat,
          lng: lng
        });

        this.sessionUser.save();
      };

      yield this.fetchCoords.perform(callback);
      yield timeout(fiveSeconds);
    }
  }).keepLatest()
});
