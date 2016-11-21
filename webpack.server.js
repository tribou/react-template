/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable flowtype/require-parameter-type */
'use strict'
const Glob = require('glob')
const NodeExternals = require('webpack-node-externals')
const Webpack = require('webpack')

const ENV = process.env.NODE_ENV || 'production'


// WEBPACK devtool
const devtool = 'source-map'

// WEBPACK entry
// construction inspired by:
// https://github.com/webpack/webpack/issues/1189#issuecomment-156576084
const entry = {
  'build/server.js': './server/index.js',
}

// Get server layouts and web components for compilation
// and place at build/layouts and build/components
// since hapi-react-views requires templates at runtime
const serverLayouts = Glob.sync('./server/views/!(*_test.js)*')
serverLayouts.forEach((file) => {

  const target = `build/views/${file.split('/').pop()}`
  entry[target] = file

})


// WEBPACK plugins
const plugins = [
  // Ignore CSS on the server
  // new Webpack.NormalModuleReplacementPlugin(/\.css$/, 'node-noop'),
  new Webpack.optimize.OccurrenceOrderPlugin(),
  new Webpack.BannerPlugin('require("source-map-support").install();', {
    raw: true,
    entryOnly: false,
  }),
]


// WEBPACK CSS Loader
const cssLoader = 'css/locals?minimize&modules&camelCase'


// WEBPACK loaders
const preLoaders = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
  },
]
const loaders = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
      cacheDirectory: ENV === 'development',
    },
  },
  {
    test: /\.json$/,
    loader: 'json-loader',
  },
  {
    test: /\.css$/,
    loader: cssLoader,
  },
]


module.exports = {

  target: 'node',

  node: {
    __dirname: false,
    __filename: false,
  },

  devtool,
  entry,
  plugins,

  output: {
    path: './',
    filename: '[name]',
    libraryTarget: 'commonjs2',
  },

  externals: [
    NodeExternals(),
  ],

  module: {
    preLoaders,
    loaders,
  },

  eslint: {
    cache: true,
    configFile: '.eslintrc',
  },

}
