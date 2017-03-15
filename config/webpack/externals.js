// @flow

'use strict'

const NodeExternals = require('webpack-node-externals')


const client = undefined

const server = [
  NodeExternals({
    whitelist: [
      /^webpack\/hot/,
    ],
  }),
]

// console.log('NodeExternals:', NodeExternals())


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
