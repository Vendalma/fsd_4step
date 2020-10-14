const webpackConfig = require('./webpack.config')
module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [{pattern : 'src/test/*.test.ts'},
    {pattern: './styles.scss'}],
        exclude: [],
        preprocessors: {
            'src/test/**/*.test.ts': ['webpack'],
            'src/test/**/*.js': ['webpack'],
            'styles.scss' : ['scss']
        },
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve,
            mode: webpackConfig.mode,
            devtool: 'inline-source-map',
        },
        browsers: ['Firefox'],
        reporters: ['spec'],

       
        port: 9000,

      
        colors: true,

       
        logLevel: config.LOG_INFO,

    
        autoWatch: true,

        

        singleRun: false,

      
        concurrency: Infinity,

    })
}