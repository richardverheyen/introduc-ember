import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: 'main',
  elementId: 'page-landing',

  store: service(),

  // The session user we create on init()
  user: undefined,

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
    this.set('user', user);
    this.startUpdateLocationLoop.perform();
  }),

  startUpdateLocationLoop: task(function*() {
    const fiveSeconds = 5 * 1000;
    while (true) {
      this.user.setProperties({
        lat: 1.11,
        long: 2.22
      });

      yield this.user.save();
      yield timeout(fiveSeconds);
    }
  }).restartable()
});
