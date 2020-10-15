
const webpackConfig = require('./webpack.config');
const path = require('path')
delete webpackConfig.entry

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        files: [{pattern : 'src/test/*.test.ts'},
    {pattern: './styles.scss'}],
        preprocessors: {
            'src/test/*.test.ts': ['webpack'],
            'styles.scss':['scss']
        },
        reporters: ["spec", 'coverage-istanbul'],
        coverageIstanbulReporter: {
            reports: [ 'html', 'text-summary', 'lcovonly' ],
            dir: path.join(__dirname, 'coverage'),
            fixWebpackSourcePaths: true,
            'report-config': {
              html: { outdir: 'html' }
            }
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
          },
        mime: {
            'text/x-typescript': ['ts','tsx']
      },
        browsers: ['Firefox'],
        port: 9000,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: false,   
        concurrency: Infinity,
    })
}