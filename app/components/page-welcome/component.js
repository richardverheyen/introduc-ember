import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: 'main',
  elementId: 'page-welcome',
  user: service(),

  name: null,
  tagline: null,

  init() {
    this._super(...arguments);

    const storedUser = JSON.parse(window.localStorage.getItem('storedUser'));
    if (storedUser) {
      this.set('name', storedUser.name);
      this.set('tagline', storedUser.tagline);
    }
  },

  actions: {
    createAccount(name, tagline) {
      window.localStorage.setItem(
        'storedUser',
        JSON.stringify({
          name: name,
          tagline: tagline
        })
      );

      this.user.createAccountFromWelcomeRoute.perform(name, tagline);
    }
  }
});
