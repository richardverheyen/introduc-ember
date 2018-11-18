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
    const user = this.store.createRecord('sessionUser', {});
    yield user.save();
    this.set('user', user);
    this.startUpdateLocationLoop.perform();
  }),

  startUpdateLocationLoop: task(function*() {
    const fiveSeconds = 5 * 1000;
    while (true) {
      this.user.setProperties({
        lat: 'xxx',
        long: 'yyy'
      });
      yield this.user.save();
      yield timeout(fiveSeconds);
    }
  }).restartable()
});
