// @flow

'use strict'

const { NODE_ENV } = process.env

const Path = require('path')
const Webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const offlinePluginConfig = require('../../offline')


const client = [

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
  new ExtractTextPlugin({
    filename: 'styles.css',
    allChunks: true,
  }),
  new AssetsPlugin({
    filename: 'assets.json',
    path: Path.resolve(__dirname, '../../../build'),
  }),
  // relative to project root
  new FaviconsWebpackPlugin('static/images/logo@2x.png'),

]


const devClient = client.concat([
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
    sourceMap: true,
  }),
  new Webpack.LoaderOptionsPlugin({
    minimize: true,
  }),

  // Keep OfflinePlugin last
  new OfflinePlugin(offlinePluginConfig),

])


const server = [

  // Ignore CSS on the server
  // new Webpack.NormalModuleReplacementPlugin(/\.css$/, 'node-noop'),
  new Webpack.BannerPlugin({
    banner: 'require("source-map-support").install();',
    raw: true,
    entryOnly: false,
  }),

]

const devServer = server.concat([
  new Webpack.HotModuleReplacementPlugin(),
  new Webpack.NoEmitOnErrorsPlugin(),
  new Webpack.NamedModulesPlugin(),
])


module.exports = {

  development: {
    client: devClient,
    server: devServer,
  },

  production: {
    client: prodClient,
    server,
  },

}
