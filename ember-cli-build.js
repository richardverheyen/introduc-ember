'use strict';

// Access ENV from config/environment
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const buildConfig = require('./config/environment')(EmberApp.env()).buildConfig;

const { isProduction } = buildConfig;

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Makes SASS listen to file changes in the component folders
    sassOptions: {
      includePaths: ['app/components'],
      overwrite: true
    },

    // Adds CSS browser prefixes
    autoprefixer: {
      browsers: [
        '> 1%',
        'Explorer > 10',
        'Firefox >= 17',
        'Chrome >= 10',
        'Safari >= 6',
        'iOS >= 6'
      ],
      cascade: false,
      remove: false
    },

    // Prevent CSS minification in development and tests
    minifyCSS: {
      enabled: isProduction
    },

    // Prevent JS minification in development and tests
    minifyJS: {
      enabled: isProduction
    },

    // Enable source maps for debugging and Sentry
    sourcemaps: {
      enabled: isProduction,
      extensions: ['js']
    },

    // Include polyfills for old browsers
    'ember-cli-babel': {
      includePolyfill: true
    },

    'ember-fetch': {
      preferNative: true
    }
  });

  return app.toTree();
};
