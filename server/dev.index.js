/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable flowtype/require-parameter-type */
const log = require('debug')('my-app:server:dev')

const Bs = require('browser-sync').create('server')
const ChildProcess = require('child_process')
const Path = require('path')
const Webpack = require('webpack')
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
const config = require('../config/webpack')

const Spawn = ChildProcess.spawn
const compiler = Webpack(config)

let server // spawn a server process
// let outputProcess // capture webpack output process

log('Starting Webpack compilation')

let lastPercentage = 0
compiler.apply(new ProgressPlugin((percentage, msg) => {

  const parsed = parseInt((percentage * 100), 10)
  if ((parsed - lastPercentage) >= 5) {

    console.log(`${parsed}% ${msg}`)
    lastPercentage = parsed

  }

}))

compiler.plugin('done', (stats) => {

  console.log('\n')
  if (stats.hasErrors()) return

  // Not working with webpack/hot/signal :( ...probably `concurrently`
  // if (!outputProcess) {

  //   const outputDirectory = stats.stats[0].compilation.compiler.outputPath
  //   const outputFilename = 'views/Html.js'
  //     // = stats.toJson().children[0].assetsByChunkName.bundle[0]
  //   const outputPath = Path.join(outputDirectory, outputFilename)
  //   log('outputFile', outputPath)
  //   outputProcess = ChildProcess.fork(outputPath)

  // }

  // log('KILL')
  // outputProcess.kill('SIGUSR2')

  if (module.hot) log('module.hot.status', module.hot.status())

  log('compiled', stats.toString({
    colors: true,
      // Debugging options
      // https://webpack.github.io/docs/node.js-api.html#stats-tojson
    chunks: false,
  }))

  Bs.reload()

})

compiler.watch({}, (err, stats) => {

  if (err) throw err

  if (!server) {

    // Start server process
    log('starting server')
    server = Spawn('node', [Path.resolve(__dirname, '../build/server.js')])
    server.stdout.on('data', (data) => {

      console.log(data.toString()) // eslint-disable-line

    })

    server.stderr.on('data', (data) => {

      console.log(data.toString()) // eslint-disable-line

    })

    // Initialize BrowserSync proxy
    Bs.init({
      proxy: 'localhost:8000',
      ghostMode: false,
      open: false,
      logFileChanges: true,
      logLevel: 'info',
      reloadOnRestart: true,
      reloadDebounce: 500,
    })

  }

})
