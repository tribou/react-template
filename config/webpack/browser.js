// @flow

const Path = require('path')
const AssetsPlugin = require('assets-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const OfflinePlugin = require('offline-plugin')

const {
  addPlugins,
  createConfig,
  env,
  setOutput,
  sourceMaps,
  webpack,
} = require('@webpack-blocks/webpack2')

const babel = require('./blocks/babel')
const cssModules = require('./blocks/cssModules')
const eslint = require('./blocks/eslint')
const getEntry = require('./blocks/getEntry')
const getResolve = require('./blocks/getResolve')
const getTarget = require('./blocks/getTarget')
const setPlatform = require('./blocks/setPlatform')

const offlinePluginConfig = require('../offline')
const splitVendor = require('webpack-blocks-split-vendor')

const { NODE_ENV } = process.env

const config = createConfig.vanilla([
  setPlatform('browser'),
  getEntry(),
  getTarget(),
  splitVendor({
    name: 'vendor',
    exclude: /(\/webpack\/hot\/|offline-plugin\/runtime\.js$)/,
  }),
  setOutput({
    path: Path.resolve(__dirname, '../../build/public/'),
    chunkFilename: '[name]-[chunkhash].js',
    filename: '[name]-[chunkhash].js',
    publicPath: '/static/',
  }),
  babel(),
  getResolve(),
  cssModules(),
  addPlugins([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV || 'development'),
      },
    }),
    new CopyPlugin([
    { from: 'static' },
    ]),
    new AssetsPlugin({
      filename: 'assets.json',
      path: Path.resolve(__dirname, '../../build'),
    }),
    // relative to project root
    // new FaviconsWebpackPlugin('static/images/logo@2x.png'),
  ]),

  env('development', [
    sourceMaps(),
    eslint(),
  ]),

  env('production', [
    sourceMaps('source-map'),
    addPlugins([
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test:
          /\.(js|css|html|json|ico|map|xml|txt|svg|eot|otf|ttf|woff|woff2)$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        output: {
          comments: false,
        },
      }),
      new webpack.LoaderOptionsPlugin({
        debug: false,
        minimize: true,
      }),

      // Keep OfflinePlugin last
      new OfflinePlugin(offlinePluginConfig),
    ]),
  ]),

  // custom configs
  (function getCustomLoadersBlock () {

    return (context) => {

      context.fileType.add({
        'application/x-misc-files': /\.(eot|otf)$/,
        'application/font-woff': /\.(woff|woff2)$/,
        'application/x-font-ttf': /\.(ttf)$/,
      })

      return {

        module: {
          rules: [
            {
              test: context.fileType('application/x-misc-files'),
              use: 'file-loader',
            },
            {
              test: context.fileType('video'),
              use: 'file-loader',
            },
            {
              test: context.fileType('image'),
              use: 'url-loader?limit=10000',
            },
            {
              test: context.fileType('application/font-woff'),
              use: 'url-loader?limit=10000&mimetype=application/font-woff',
            },
            {
              test: context.fileType('application/x-font-ttf'),
              use: 'url-loader?limit=10000&mimetype=application/octet-stream',
            },
          ],
        },
      }

    }

  })(),
])


module.exports = config
