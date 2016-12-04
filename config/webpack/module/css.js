'use strict'

// Exports { css: config, modules: config }

const ExtractTextPlugin = require('extract-text-webpack-plugin')


// development
const client = {

  css: ExtractTextPlugin.extract('css'
    + '?importLoaders=1'
    + '!postcss'),

  modules: ExtractTextPlugin.extract('css'
    + '?modules&camelCase'
    + '&importLoaders=1'
    + '&localIdentName=[path]__[name]__[local]__[hash:base64:3]'
    + '!postcss'),
}


const server = {
  css: 'css/locals',
  modules: 'css/locals?modules&camelCase'
    + '&localIdentName=[path]__[name]__[local]__[hash:base64:3]',
}


// production
const prodClient = {

  css: ExtractTextPlugin.extract('css'
    + '?minimize&importLoaders=1'
    + '!postcss'),

  modules: ExtractTextPlugin.extract('css?minimize'
    + '&modules&camelCase'
    + '&importLoaders=1'
    + '!postcss'),
}


const prodServer = {
  css: 'css/locals?minimize',
  modules: 'css/locals?minimize&modules&camelCase',
}


module.exports = {

  development: {
    client,
    server,
  },

  production: {
    client: prodClient,
    server: prodServer,
  },

}
