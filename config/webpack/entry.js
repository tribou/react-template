// @flow

'use strict'

const Glob = require('glob')

const { NODE_ENV } = process.env

if (!NODE_ENV) throw new Error('Set NODE_ENV')


const client = {
  // include CSS files here where order of precedence is needed
  // Bundle vendor libraries in a separate chunk
  vendor: [
    'axios',
    'babel-polyfill',
    'classnames',
    'cookies-js',
    'debug',
    'immutable',
    'js-base64',
    'react',
    'react-dom',
    'react-helmet',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux',
    'redux-devtools-extension',
    'redux-form',
    'redux-observable',
    'redux-promise-middleware',
    'redux-thunk',
    'reselect',
    'rxjs',
    'rollbar-browser/dist/rollbar.umd.nojson.min.js',
    'transit-immutable-js',
  ],
  bundle: [
    'sanitize.css/sanitize.css',
    './src/styles/fonts.css',
    './src/styles/app.css',
    './src/browser.index.js',
  ],
}


// construction inspired by:
// https://github.com/webpack/webpack/issues/1189#issuecomment-156576084
const serverEntry = (NODE_ENV === 'development')
  ? ['webpack/hot/poll?500']
  : []
const server = {
  'server.js': serverEntry.concat(['./server/index.js']),
}


// Get server layouts and web components for compilation
// and place at build/layouts and build/components
// since hapi-react-views requires templates at runtime
const serverLayouts = Glob.sync('./server/views/!(*_test.js)*')
serverLayouts.forEach((file) => {

  const target = `views/${file.split('/').pop()}`
  server[target] = file

})


module.exports = {

  development: {
    client,
    server,
  },

  production: {
    client,
    server,
  },

}
