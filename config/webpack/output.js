'use strict'

const client = {
  path: './build/public/',
  chunkFilename: '[name]-[chunkhash].js',
  filename: '[name]-[chunkhash].js',
  publicPath: '/static/',
}


const server = {
  path: './',
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
