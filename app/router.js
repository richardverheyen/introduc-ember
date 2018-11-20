import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import { inject as service } from '@ember/service';
import { on } from '@ember/object/evented';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  user: service(),

  onEachDidTransition: on('didTransition', function() {
    this.user.checkLocalStorageForAccount();
  })
});

Router.map(function() {
  this.route('welcome');
});

export default Router;
