import Service from '@ember/service';

import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Service.extend({
  store: service(),
  router: service(),
  storedUser: null,
  sessionUser: null,

  checkLocalStorageForAccount() {
    const storedUser = JSON.parse(window.localStorage.getItem('currentUser'));

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
    const user = this.store.createRecord('user', storedUser);
    yield user.save();
    this.set('sessionUser', user);
    this.startUpdateLocationLoop.perform();
  }),

  startUpdateLocationLoop: task(function*() {
    const fiveSeconds = 5 * 1000;
    while (true) {
      // console.log('updating location');
      this.sessionUser.setProperties({
        lat: 1.11,
        long: 2.22
      });

      yield this.sessionUser.save();
      yield timeout(fiveSeconds);
    }
  }).restartable()
});
