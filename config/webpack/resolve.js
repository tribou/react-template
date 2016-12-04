'use strict'

const Path = require('path')


const client = {
  root: [
    Path.resolve(__dirname, '../../src'),
    Path.resolve(__dirname, '../../server'),
    Path.resolve(__dirname, '../../static'),
  ],
  extensions: [
    '',
    '.js',
    '.web.js',
  ],
}

const server = client


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
