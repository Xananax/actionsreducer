var webpackConfig = require('./webpack.config');

module.exports = function karmaConf(config)
	{
		config.set(
			{ basePath: ''
			, frameworks:
				[ 'mocha'
				, 'chai'
				]
			, files: 
				[ 'src/**/*.test.ts'
				]
			, exclude: 
				[
				]
			, preprocessors:
				{ 'src/**/*.ts':
					[ 'webpack'
					, 'sourcemap' 
					]
				}
			, webpack: 
				{ module: webpackConfig.module
				, resolve: webpackConfig.resolve
				}
			, webpackMiddleware: 
				{ noInfo: true
				}
			, reporters:
				[ 'spec' ]
			, port: 9876
			, colors: true
			, logLevel: config.LOG_INFO
			, autoWatch: true
			, browsers:
				[ 'PhantomJS'
				, 'Chrome' 
				]
			, singleRun: false
			, concurrency: Infinity
			}
		);
	}