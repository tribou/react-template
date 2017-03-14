// @flow

'use strict'

const { NODE_ENV, WEBPACK_ENV } = process.env

if (!NODE_ENV || !WEBPACK_ENV) throw new Error('Set NODE_ENV and WEBPACK_ENV')

const cssLoaders = require('./css')[NODE_ENV][WEBPACK_ENV]


const rules = [
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
    use: cssLoaders.modules,
  },
  {
    test: /node_modules.*\.css$/,
    use: cssLoaders.css,
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
  rules: rules.concat(devRules),
}

const server = {
  rules: rules.concat(devRules),
}

const prodClient = {
  rules,
}

const prodServer = {
  rules,
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
