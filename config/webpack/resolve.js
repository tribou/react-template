// @flow

'use strict'

const Path = require('path')


const client = {
  modules: [
    Path.resolve(__dirname, '../..'),
    'node_modules',
  ],
  extensions: [
    '.js',
    '.json',
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
