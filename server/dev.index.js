/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable flowtype/require-parameter-type */
require('css-modules-require-hook')({
  generateScopedName: '[path]__[name]__[local]__[hash:base64:3]',
})
require('babel-register')()
const log = require('debug')('my-app:server:dev')
const Webpack = require('webpack')
const config = require('../webpack.browser.js')
const start = require('./index.js').default

log('starting')
start(() => {

  log('started')
  const compiler = Webpack(config)
  compiler.watch({}, (err, stats) => {

    if (err) {

      log('ERROR:', err)
      return

    }

    log('compiled', stats.toString({
      colors: true,
      // Debugging options
      // https://webpack.github.io/docs/node.js-api.html#stats-tojson
      chunks: false,
    }))

  })

})
