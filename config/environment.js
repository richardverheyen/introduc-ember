'use strict';

// Where the Elixir backend is located
const apiHosts = {
  development: 'http://localhost:3000',
  production: 'https://api.introduc.com'
};

// Where this Ember app is located
const appHosts = {
  development: 'http://localhost:4200',
  production: 'https://interflux.com'
};

// Where the CDN is located
const cdnHosts = {
  development: 'http://localhost:9000',
  production: 'https://cdn.introduc.com'
};

module.exports = function(environment) {
  // Environment flags
  const isDevelopment = environment === 'development';
  const isProduction = environment === 'production';
  const isTest = environment === 'test';

  // Hosts
  const apiHost = apiHosts[environment];
  const appHost = appHosts[environment];
  const cdnHost = cdnHosts[environment];

  // The Elixir API namespace (for example 'v1/public')
  const apiNamespace = 'v1';

  let ENV = {
    modulePrefix: 'introduc',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    buildConfig: {
      isDevelopment,
      isTest,
      isProduction,
      apiHost,
      appHost,
      cdnHost,
      apiNamespace
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
