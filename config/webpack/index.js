/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable global-require */

'use strict'

const { NODE_ENV, WEBPACK_ENV } = process.env

const devtool = require('./devtool')[NODE_ENV][WEBPACK_ENV]
const entry = require('./entry')[NODE_ENV][WEBPACK_ENV]
const output = require('./output')[NODE_ENV][WEBPACK_ENV]
const resolve = require('./resolve')[NODE_ENV][WEBPACK_ENV]
const externals = require('./externals')[NODE_ENV][WEBPACK_ENV]
const node = require('./node')[NODE_ENV][WEBPACK_ENV]
const plugins = require('./plugins')[NODE_ENV][WEBPACK_ENV]
const target = require('./target')[NODE_ENV][WEBPACK_ENV]
const webpackModule = require('./module')[NODE_ENV][WEBPACK_ENV]
const postcss = require('../postcss')


// Additional build scripts
module.exports = {

  devtool,
  entry,
  externals,
  output,
  resolve,
  target,
  node,
  plugins,

  module: webpackModule,

  eslint: {
    configFile: '.eslintrc.yml',
  },

  postcss,

}
