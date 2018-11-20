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
    createAccount() {
      if ('geolocation' in navigator) {
        // TODO: This is asynchronous, we need to set a loading state and wait until it's all set up.
        navigator.geolocation.getCurrentPosition(pos => {
          this.user.set('lat', pos.coords.latitude);
          this.user.set('lng', pos.coords.longitude);
        });
      } else {
        alert('geolocation IS NOT available');
        return;
      }

      window.localStorage.setItem(
        'storedUser',
        JSON.stringify({
          name: this.name,
          tagline: this.tagline
        })
      );

      this.user.checkLocalStorageForAccount();
    }
  }
});
