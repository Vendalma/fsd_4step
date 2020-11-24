const path = require('path');
const webpackConfig = require('./webpack.config');

delete webpackConfig.entry;

module.exports = function (config) {
  config.set({
    plugins: [
      'karma-jasmine',
      'karma-jasmine-jquery-2',
      '@metahub/karma-jasmine-jquery',
      'karma-coverage-istanbul-reporter',
      'karma-spec-reporter',
      'karma-webpack',
      'karma-firefox-launcher',
      'karma-jquery',
    ],
    frameworks: ['jasmine', 'jasmine-jquery'],
    client: {
      jasmine: {
        random: false,
      },
    },
    files: [{ pattern: 'src/test/*.test.ts' }],
    preprocessors: {
      'src/test/*.test.ts': ['webpack'],
    },
    reporters: ['spec', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: ['html', 'text-summary', 'lcovonly'],
      dir: path.join(__dirname, 'coverage'),
      fixWebpackSourcePaths: true,
      'report-config': {
        html: { outdir: 'html' },
      },
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx'],
    },
    browsers: ['Firefox'],
    port: 9000,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,
  });
};
