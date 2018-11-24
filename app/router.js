import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import { inject as service } from '@ember/service';
import { on } from '@ember/object/evented';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  user: service(),

  onInit: on('init', function() {}),

  onEachDidTransition: on('didTransition', function() {
    if (!this.get('user.sessionUser.id')) {
      this.transitionTo('welcome');
    } else {
      this.user.startUpdateLocationLoop.perform();
    }
  })
});

Router.map(function() {
  this.route('welcome');
});

export default Router;
