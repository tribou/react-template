// @flow

'use strict'

const Path = require('path')

const client = {
  path: Path.resolve(__dirname, '../../build/public/'),
  chunkFilename: '[name]-[chunkhash].js',
  filename: '[name]-[chunkhash].js',
  publicPath: '/static/',
}


const server = {
  path: Path.join(__dirname, '../../build'),
  filename: '[name]',
  libraryTarget: 'commonjs2',
}


module.exports = {

  development: {
    client,
    server,
  },

  production: {
    client,
    server,
  },

}
