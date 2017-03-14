// @flow

'use strict'

// Exports { css: config, modules: config }

const ExtractTextPlugin = require('extract-text-webpack-plugin')


// development
const client = {

  css: ExtractTextPlugin.extract({
    use: 'css-loader'
    + '?importLoaders=1'
    + '!postcss-loader' }),

  modules: ExtractTextPlugin.extract({
    use: 'css-loader'
    + '?modules&camelCase'
    + '&importLoaders=1'
    + '&localIdentName=[path]__[name]__[local]__[hash:base64:3]'
    + '!postcss-loader' }),
}


const server = {
  css: 'css-loader/locals',
  modules: 'css-loader/locals?modules&camelCase'
    + '&localIdentName=[path]__[name]__[local]__[hash:base64:3]',
}


// production
const prodClient = {

  css: ExtractTextPlugin.extract({
    use: 'css-loader'
    + '?minimize&importLoaders=1'
    + '!postcss-loader' }),

  modules: ExtractTextPlugin.extract({
    use: 'css-loader?minimize'
    + '&modules&camelCase'
    + '&importLoaders=1'
    + '!postcss-loader' }),
}


const prodServer = {
  css: 'css-loader/locals?minimize',
  modules: 'css-loader/locals?minimize&modules&camelCase',
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
