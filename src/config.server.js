const path = require('path')
const nodeExternals = require('webpack-node-externals')

const nodeEnv = process.env.NODE_ENV || 'development'
const isDevelopment = nodeEnv === 'development'

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  name: 'server',
  devtool: isDevelopment ? 'eval' : false,
  entry: path.join(__dirname, '/render.server.js'),
  target: 'node',
  bail: !isDevelopment,
  externals: [
    nodeExternals()
  ],
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'render.server.js',
    libraryTarget: 'commonjs-module'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: [/node_modules/],
      use: 'babel-loader?retainLines=true'
    }, {
      test: /\.riot$/,
      exclude: /node_modules/,
      use: [{
        loader: '@riotjs/webpack-loader',
        options: {
          hot: isDevelopment
        }
      }]
    }]
  }
}
