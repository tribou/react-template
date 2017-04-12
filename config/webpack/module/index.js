// @flow

'use strict'

const { NODE_ENV } = process.env

if (!NODE_ENV) throw new Error('Set NODE_ENV')

const cssLoaders = require('./css')[NODE_ENV]


const getRules = (platform) => {

  return [
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

const prodRules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: 'babel-loader',
  },
]

const client = {
  rules: getRules('client').concat(devRules, [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'happypack/loader?id=js',
    },
  ]),
}

const server = {
  rules: getRules('server').concat(devRules, [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'happypack/loader?id=js',
    },
  ]),
}

const prodClient = {
  rules: getRules('client').concat(prodRules),
}

const prodServer = {
  rules: getRules('server').concat(prodRules),
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
