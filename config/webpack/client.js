// @flow

const Path = require('path')
const AssetsPlugin = require('assets-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const OfflinePlugin = require('offline-plugin')

const {
  addPlugins,
  createConfig,
  defineConstants,
  entryPoint,
  env,
  setOutput,
  sourceMaps,
  webpack,
} = require('@webpack-blocks/webpack2')

const babel = require('./blocks/babel')
const cssModules = require('./blocks/cssModules')
const eslint = require('./blocks/eslint')
const getResolve = require('./blocks/getResolve')
const getTarget = require('./blocks/getTarget')

const offlinePluginConfig = require('../offline')
// const splitVendor = require('webpack-blocks-split-vendor')

const { NODE_ENV } = process.env

const config = createConfig.vanilla([

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

  // include CSS files here where order of precedence is needed
  // Bundle vendor libraries in a separate chunk
  entryPoint({
    vendor: [
      'axios',
      'babel-polyfill',
      'classnames',
      'cookies-js',
      'debug',
      'immutable',
      'js-base64',
      'react',
      'react-dom',
      'react-helmet',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-devtools-extension',
      'redux-form',
      'redux-observable',
      'redux-promise-middleware',
      'redux-thunk',
      'reselect',
      'rxjs',
      'rollbar-browser/dist/rollbar.umd.nojson.min.js',
      'transit-immutable-js',
    ],
    bundle: [
      'sanitize.css/sanitize.css',
      './src/styles/fonts.css',
      './src/styles/app.css',
      './src/browser.index.js',
    ],
  }),

  setOutput({
    path: Path.resolve(__dirname, '../../build/public/'),
    chunkFilename: '[name]-[chunkhash].js',
    filename: '[name]-[chunkhash].js',
    publicPath: '/static/',
  }),

  babel(),

  defineConstants({
    'process.env': {
      NODE_ENV,
    },
  }),

  getResolve(),

  getTarget('web'),

  cssModules(),

  addPlugins([

    new CopyPlugin([
    { from: 'static' },
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: Infinity,
    }),
    new AssetsPlugin({
      filename: 'assets.json',
      path: Path.resolve(__dirname, '../../build'),
    }),
    // relative to project root
    new FaviconsWebpackPlugin('static/images/logo@2x.png'),

  ]),

  env('development', [

    sourceMaps(),
    eslint(),

  ]),

  env('production', [

    sourceMaps('source-map'),
    // splitVendor('vendor'),

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
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
      }),

      // Keep OfflinePlugin last
      new OfflinePlugin(offlinePluginConfig),

    ]),

  ]),

])


module.exports = config
