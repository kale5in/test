/*eslint-disable */
var path = require("path");
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.base.js');

module.exports = function(env) {
    return webpackMerge(commonConfig(), {
      entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index'
      ],
        plugins: [
          new webpack.HotModuleReplacementPlugin(),
        ]
    })
}
