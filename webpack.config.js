const path = require('path');
const webpack = require('webpack');
const failPlugin = require('webpack-fail-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PKG = require('./package.json');

const NAME = PKG.name;
const VERSION = PKG.version; 
const IS_PROD = (process.env.NODE_ENV == 'production');
const IS_MIN = (process.env.MINIMIZE == 'true');
const IS_DEV = !IS_PROD;
const IS_SERVER = process.env.SERVER; //for server rendering;
const IS_BROWSER = !IS_SERVER;

const css_loader = `css-loader${IS_SERVER?'/locals':''}`+'?'+JSON.stringify(
	{ modules:true
	, importLoaders:1
	, sourcemap:true
	, camelCase:true
	, localIdentName:'[name]_[local]_[hash:base64:5]'
	})

const noChangesCss_loader = `css-loader${IS_SERVER?'/locals':''}`+'?'+JSON.stringify(
	{ modules:true
	, importLoaders:1
	, sourcemap:true
	, camelCase:true
	, localIdentName:'[local]'
	}) 

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
		{ extensions: 
			[ ""
			, ".webpack.js"
			, ".web.js"
			, ".ts"
			, ".tsx"
			, ".js"
			, ".md"
			, ".markdown"
			, ".styl"
			, ".css"
			]
		}
	, plugins:
		[ failPlugin
		, IS_PROD && new webpack.optimize.DedupePlugin()
		, IS_PROD && IS_MIN && new webpack.optimize.UglifyJsPlugin(
			{ compress: 
				{ warnings: false
				}
			})
		, IS_PROD && new ExtractTextPlugin("style.css", {allChunks: true})
		].filter(Boolean)
	, module:
		{ loaders:
			[
				{ test: /\.tsx?$/
				, loader: 'awesome-typescript-loader'+'?'+JSON.stringify(
					{ silent:true
					, useBabel:true
					, resolveGlobs:true
					, forkCheckerSilent:true
					, declaration:false
					})
				, include: path.resolve(__dirname, "./src")
				, exclude:/node_modules/
				}
			,	{ test:/\.(md|markdown)$/
				, loaders:
					[ 'html-loader'
					, 'markdown-loader'
					]
				}
			,	{ test:/\.css$/
				, loader: 
					IS_DEV || IS_SERVER ? 
						[ 'style-loader'
						, noChangesCss_loader
						].join('!') :
						ExtractTextPlugin.extract("css", "css-loader")
				, include:/node_modules/
				}
			,	{ test:/\.css$/
				, loader: 
					IS_DEV || IS_SERVER ?
						[ 'style-loader'
						, css_loader
						].join('!') :
						ExtractTextPlugin.extract("css", "css-loader")
				, exclude:/node_modules/
				}
			,	{ test: /\.styl$/
				, loader: 
					IS_DEV || IS_SERVER ?
						[ 'style-loader'
						, css_loader
						//, 'postcss-loader'
						, 'stylus-loader'
						].join('!') :
						ExtractTextPlugin.extract("stylus", "css-loader!stylus-loader")
				}
			]
		}
	};