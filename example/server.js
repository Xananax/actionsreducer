const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config');
const webpack = require('webpack');

const port = process.env.PORT || 8080;

const publicPath = `http://localhost:${port}/`;

config.entry.index = 
	[ `webpack-dev-server/client?${publicPath}`
	, 'webpack/hot/dev-server'
	, './src/index.tsx'
	];

config.module.loaders[0].loader =
	[ 'react-hot'
	, config.module.loaders[0].loader	
	].join('!');


config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

config.output.publicPath = publicPath;

const compiler = webpack(config);

const devServer = 
	{ contentBase:__dirname
	, hot:true
	, host:'0.0.0.0'
	, publicPath:'/'
	, stats: 
		{ colors: true
		}
	};
 
const server = new WebpackDevServer(compiler, devServer);

server.listen(port,function(){
	console.log(`listening on ${port}`)
});