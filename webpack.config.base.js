/*eslint-disable */
const path = require("path");
const webpack = require('webpack');

module.exports = function() {
  return {
    output: {
      path: path.join(__dirname, 'public', 'assets'),
      filename: 'bundle.js',
      publicPath: '/assets/'
    },
    resolve: {
      extensions: [' ', '.js', '.jsx', '.json'],
      modules: ['node_modules', 'src']
    },
    plugins: [

    ],
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif|svg|eot|ttf|woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
          use: [
            'file-loader',
          ],
        },
        {
          test: /\.jsx?$/,
          use: [
            'babel-loader',
          ],
          exclude: /node_modules/
        },
        {
          test: /\.sass$/,
          use: [
            'style-loader',
            'css-loader?modules',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
      ],
    },
  };
};
