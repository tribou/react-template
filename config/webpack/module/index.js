// @flow

'use strict'

const { NODE_ENV } = process.env

if (!NODE_ENV) throw new Error('Set NODE_ENV')

const cssLoaders = require('./css')[NODE_ENV]


const getRules = (platform) => {

  return [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        cacheDirectory: NODE_ENV === 'development',
      },
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: cssLoaders[platform].modules,
    },
    {
      test: /node_modules.*\.css$/,
      use: cssLoaders[platform].css,
    },
    {
      test: /\.(eot|mp4|otf)$/,
      use: 'file-loader',
    },
    {
      test: /\.(gif|jpeg|jpg|png|svg)$/,
      use: 'url-loader?limit=10000',
    },
    {
      test: /\.(woff|woff2)$/,
      use: 'url-loader?limit=10000&mimetype=application/font-woff',
    },
    {
      test: /\.ttf$/,
      use: 'url-loader?limit=10000&mimetype=application/octet-stream',
    },
  ]

}

const devRules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    enforce: 'pre',
    options: {
      configFile: '.eslintrc.yml',
    },
  },
]

const client = {
  rules: getRules('client').concat(devRules),
}

const server = {
  rules: getRules('server').concat(devRules),
}

const prodClient = {
  rules: getRules('client'),
}

const prodServer = {
  rules: getRules('server'),
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
