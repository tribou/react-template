// @flow

'use strict'

module.exports = {

  development: {
    client: 'cheap-module-eval-source-map',
    server: 'cheap-module-eval-source-map',
  },

  production: {
    client: 'source-map',
    server: 'source-map',
  },

}
