const path = require('path');
const webpack = require('webpack');
const failPlugin = require('webpack-fail-plugin');

const PKG = require('./package.json');

const NAME = PKG.name;
const VERSION = PKG.version; 
const IS_PROD = (process.env.NODE_ENV == 'production');
const IS_MIN = (process.env.MINIMIZE == 'true');

module.exports = 
	{ entry: 
		{ index:'./index.ts'
		}
	, devtool: 'source-map'
	, context: path.join(__dirname,'src')
	, output: 
		{ path: path.join(__dirname,'browser')
		, filename: `[name].${VERSION}${IS_MIN?'.min':''}.js`
		, library: NAME
		, libraryTarget:'umd'
		}
	, resolve:
		{ extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
		}
	, plugins:
		[ failPlugin
		, IS_PROD && new webpack.optimize.DedupePlugin()
		, IS_PROD && IS_MIN && new webpack.optimize.UglifyJsPlugin(
			{ compress: 
				{ warnings: false
				}
			})
		].filter(Boolean)
	, module:
		{ loaders:
			[
				{ test: /\.tsx?$/
				, loader: 'awesome-typescript-loader' 
				, query:
					{ silent:true
					, useBabel:true
					, resolveGlobs:true
					, forkCheckerSilent:true
					, declaration:false
					}
				, include: path.resolve(__dirname, "./src") 
				}
			]
		}
	};