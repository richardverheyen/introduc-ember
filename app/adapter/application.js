// This adapter is responsible for all Ember Data requests to the API
// Production should hit https://api.interflux.com/admin/
// Development should hit http://localhost:3000/admin/
// Tests should hit Ember Mirage

import JSONAPIAdapter from 'ember-data/adapters/json-api';
import AdapterFetch from 'ember-fetch/mixins/adapter-fetch';
// import config from 'ember-get-config';
// import { computed } from '@ember/object';
// import { pluralize } from 'ember-inflector';
// import { underscore } from '@ember/string';
//
// const { apiHost, apiNamespace } = config.buildConfig;

export default JSONAPIAdapter.extend(AdapterFetch, {
  // host: apiHost,
  // namespace: apiNamespace,
  // Add dynamic headers here
  // Docs: https://guides.emberjs.com/release/models/customizing-adapters/
  // headers: computed({
  //   get() {
  //     return {
  //       'Content-Type': 'application/vnd.api+json',
  //       Accept: 'application/vnd.api+json'
  //     };
  //   }
  // }),
  // Convert the Ember model name to something Rails would recognise:
  // Rails expects underscored resources
  // Rails expects pluralized resources
  // pathForType: function(type) {
  //   return pluralize(underscore(type));
  // }
});
