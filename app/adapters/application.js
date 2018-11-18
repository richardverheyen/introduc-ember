// This adapter is responsible for converting all outgoing API requests to be
// formatted according the JSON API specs.
// https://jsonapi.org/
// https://www.emberjs.com/api/ember-data/release/classes/DS.JSONAPIAdapter
//
// The fetch mixin is responsible for Ember Data to use HTML5 fetch() polyfill
// instead of the dreaded jQuery $.ajax().
// https://github.com/ember-cli/ember-fetch
//
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import AdapterFetch from 'ember-fetch/mixins/adapter-fetch';
import config from 'ember-get-config';
import { computed } from '@ember/object';

const { apiHost, apiNamespace } = config.buildConfig;

export default JSONAPIAdapter.extend(AdapterFetch, {
  host: apiHost,
  namespace: apiNamespace,

  // Dynamically set the headers on each request.
  // Docs: https://guides.emberjs.com/release/models/customizing-adapters/
  headers: computed({
    get() {
      const headers = {};

      // With the Content-Type header 'application/vnd.api+json' we say that
      // what we send to the API is JSON API compliant.
      headers['Content-Type'] = 'application/vnd.api+json';

      // With the Accept header 'application/vnd.api+json' we say that what we
      // expect back from the API is JSON API compliant data.
      headers['Accept'] = 'application/vnd.api+json';

      return headers;
    }
  })
});
