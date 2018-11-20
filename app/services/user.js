import Service from '@ember/service';

import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Service.extend({
  store: service(),
  sessionUser: null,

  init() {
    this._super(...arguments);
    this.createSessionUser.perform();
  },

  createSessionUser: task(function*() {
    const user = this.store.createRecord('user', {
      name: 'Richard Verheyen',
      tagline: 'Ember sent this tagline',
      lat: 1.1111,
      lng: 2.222
    });
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
