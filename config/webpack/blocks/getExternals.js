// @flow
const NodeExternals = require('webpack-node-externals')


function getExternals () {

  return ({ platform }/* : { platform: Platform } */) => {

    const externals = [
      NodeExternals({
        whitelist: [
          /^webpack\/hot/,
        ],
      }),
    ]

    return platform === 'server'
      ? { externals }
      : {}

  }

}


module.exports = getExternals
