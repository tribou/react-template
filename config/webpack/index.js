// @flow
/* eslint-disable global-require */

'use strict'

const { NODE_ENV, WEBPACK_ENV } = process.env

if (!NODE_ENV || !WEBPACK_ENV) throw new Error('Set NODE_ENV and WEBPACK_ENV')

const devtool = require('./devtool')[NODE_ENV][WEBPACK_ENV]
const entry = require('./entry')[NODE_ENV][WEBPACK_ENV]
const output = require('./output')[NODE_ENV][WEBPACK_ENV]
const resolve = require('./resolve')[NODE_ENV][WEBPACK_ENV]
const externals = require('./externals')[NODE_ENV][WEBPACK_ENV]
const node = require('./node')[NODE_ENV][WEBPACK_ENV]
const plugins = require('./plugins')[NODE_ENV][WEBPACK_ENV]
const target = require('./target')[NODE_ENV][WEBPACK_ENV]
const webpackModule = require('./module')[NODE_ENV][WEBPACK_ENV]


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

}
