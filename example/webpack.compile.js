const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config');
const webpack = require('webpack');
const path = require('path');

config.output.path = path.join(__dirname,'compiled');

module.exports = config;