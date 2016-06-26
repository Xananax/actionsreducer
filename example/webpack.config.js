const config = require('../webpack.config.js');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PKG = require('../package.json'); 

const VERSION = PKG.version;
const NAME = PKG.name;
const ENV = process.env.NODE_ENV;

config.entry.index = 
	[ './src/index.tsx'
	];
config.context = __dirname;
config.module.loaders[0].include = 
	[ config.module.loaders[0].include
	, path.resolve(__dirname,'./src')
	] 

config.plugins = 
	[ new HtmlWebpackPlugin(
		{ title:`${NAME}.${VERSION} Example App`
		, hash: true 
		, template:'template.html'
		})
	,  new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(ENV)
		})
	];

module.exports = config;