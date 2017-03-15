/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable flowtype/require-parameter-type */
const log = require('debug')('my-app:server:dev')

const Bs = require('browser-sync').create('server')
const Path = require('path')
const Spawn = require('child_process').spawn
const Webpack = require('webpack')
const config = require('../config/webpack')

const compiler = Webpack(config)

let server // spawn a server process
const total = 2 // number of bundles building
let count = 1 // count for tracking how many bundles finished

log('Starting Webpack compilation')
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

  if (!server) {

    log('starting server')
    server = Spawn('node', [Path.resolve(__dirname, '../build/server.js')])
    server.stdout.on('data', (data) => {

      console.log(data.toString()) // eslint-disable-line

    })

    server.stderr.on('data', (data) => {

      console.log(data.toString()) // eslint-disable-line

    })
    Bs.init({
      proxy: 'localhost:8000',
      ghostMode: false,
      open: false,
      logFileChanges: true,
      logLevel: 'info',
      reloadOnRestart: true,
      reloadDebounce: 700,
    })

  }
  else if (count < total) {

    count += 1
    log('count:', count)

  }
  else {

    log('RELOAD count:', count)
    Bs.reload()
    count = 1

  }

})
