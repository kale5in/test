/*eslint-disable */
const path = require("path");
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.base.js');

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
