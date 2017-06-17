// @flow

const Path = require('path')

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
const getEntry = require('./blocks/getEntry')
const getExternals = require('./blocks/getExternals')
const getResolve = require('./blocks/getResolve')
const getTarget = require('./blocks/getTarget')
const setPlatform = require('./blocks/setPlatform')


const config = createConfig.vanilla([
  setPlatform('server'),
  getTarget(),
  getEntry(),
  setOutput({
    path: Path.join(__dirname, '../../build'),
    filename: '[name]',
    libraryTarget: 'commonjs2',
  }),
  babel(),
  getResolve(),
  getExternals(),
  cssModules(),
  addPlugins([
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ]),

  env('development', [
    sourceMaps(),
    addPlugins([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
    ]),
  ]),

  env('production', [
    sourceMaps('source-map'),
    addPlugins([
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
    ]),
  ]),

  // custom configs
  (function getCustomLoadersBlock () {

    return context => {

      context.fileType.add({
        'application/x-misc-files': /\.(eot|otf)$/,
        'application/font-woff': /\.(woff|woff2)$/,
        'application/x-font-ttf': /\.(ttf)$/,
      })

      return {

        node: {
          __dirname: false,
          __filename: false,
        },

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
