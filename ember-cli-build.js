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
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
