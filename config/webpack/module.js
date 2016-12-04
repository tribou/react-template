'use strict'

const { NODE_ENV, WEBPACK_ENV } = process.env

const cssLoaders = require('./module/css')[NODE_ENV][WEBPACK_ENV]


const loaders = [
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
    loader: cssLoaders.modules,
  },
  {
    test: /node_modules.*\.css$/,
    loader: cssLoaders.css,
  },
  {
    test: /\.json$/,
    loader: 'json-loader',
  },
  {
    test: /\.(eot|mp4|otf)$/,
    loader: 'file-loader',
  },
  {
    test: /\.(gif|jpeg|jpg|png|svg)$/,
    loader: 'url-loader?limit=10000',
  },
  {
    test: /\.(woff|woff2)$/,
    loader: 'url-loader?limit=10000&mimetype=application/font-woff',
  },
  {
    test: /\.ttf$/,
    loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
  },
]

const preLoaders = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
  },
]


const client = {
  preLoaders,
  loaders,
}

const server = {
  preLoaders,
  loaders,
}

const prodClient = {
  loaders,
}

const prodServer = {
  loaders,
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
