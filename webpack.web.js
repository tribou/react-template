/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable flowtype/require-parameter-type */
'use strict'
const BrowserConfig = require('./webpack.browser.js')
const ServerConfig = require('./webpack.server.js')

module.exports = [
  BrowserConfig,
  ServerConfig,
]
