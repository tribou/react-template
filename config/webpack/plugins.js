'use strict'

const { NODE_ENV } = process.env

const Webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const { version } = require('../../package.json')


// offline-plugin config
const offlineRoutes = [
  // '/',
  // '/test',
]


const client = [

  new Webpack.optimize.OccurrenceOrderPlugin(),
  new Webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV || 'development'),
    },
  }),
  // new Webpack.ProvidePlugin({
  //   $: 'jquery',
  //   jQuery: 'jquery',
  //   'window.jQuery': 'jquery',
  // }),
  // new Webpack.EnvironmentPlugin([
  //   'ENV_VAR',
  // ]),
  new CopyPlugin([
    { from: 'static' },
  ]),
  new Webpack.optimize.CommonsChunkPlugin({
    names: ['vendor'],
    minChunks: Infinity,
  }),
  new ExtractTextPlugin('styles.css', { allChunks: true }),
  new AssetsPlugin({
    filename: '/build/assets.json',
  }),

]


const devClient = client.concat([

  new BrowserSyncPlugin({
    proxy: 'localhost:8000',
    ghostMode: false,
    open: false,
    logFileChanges: true,
    logLevel: 'info',
    reloadOnRestart: true,
  }),

])


const prodClient = client.concat([

  new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.(js|css|html|json|ico|map|xml|txt|svg|eot|otf|ttf|woff|woff2)$/,
    threshold: 10240,
    minRatio: 0.8,
  }),
  new Webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),

  // Keep OfflinePlugin last
  new OfflinePlugin({
    AppCache: {
      events: true,
    },
    ServiceWorker: {
      events: true,
    },
    version: `v${version}-[hash]`,
    publicPath: '/',
    externals: offlineRoutes,
    excludes: [
      '**/.*',
      '**/*.map',
      'robots.txt',
    ],
    // If publicPath is a subdirectory
    rewrites: (asset) => {

      // prefix with /static/ unless webpack asset is a page route
      return offlineRoutes.indexOf(asset) === -1
        ? `/static/${asset}`
        : asset

    },
  }),

])


const server = [

  // Ignore CSS on the server
  // new Webpack.NormalModuleReplacementPlugin(/\.css$/, 'node-noop'),
  new Webpack.optimize.OccurrenceOrderPlugin(),
  new Webpack.BannerPlugin('require("source-map-support").install();', {
    raw: true,
    entryOnly: false,
  }),

]


module.exports = {

  development: {
    client: devClient,
    server,
  },

  production: {
    client: prodClient,
    server,
  },

}
