'use strict'

const NodeExternals = require('webpack-node-externals')


const client = undefined

const server = [
  NodeExternals(),
]


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
