const path = require('path');
const nodeExternals = require('webpack-node-externals');

const externalFolder = new RegExp(`^${path.resolve(__dirname, '../src')}/(react|redux)/.*$`);
const nodeEnv = process.env.NODE_ENV || 'development';
const isDevelopment = nodeEnv === 'development';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  name: 'server',
  devtool: isDevelopment ? 'eval' : false,
  entry: __dirname + '/render.js',
  target: 'node',
  bail: !isDevelopment,
  externals: [
    nodeExternals(),
  ],
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'render.bundle.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: [/node_modules/],
      use: 'babel-loader?retainLines=true',
    }, {
      test: /\.riot$/,
      exclude: /node_modules/,
      use: [{
        loader: '@riotjs/webpack-loader',
        options: {
          hot: false, // set it to true if you are using hmr
          // add here all the other @riotjs/compiler options riot.js.org/compiler
          // template: 'pug' for example
        }
      }]
    }],
  },
};
