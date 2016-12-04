// WEBPACK entry

'use strict'

const Glob = require('glob')


const client = {
  // include CSS files here where order of precedence is needed
  // Bundle vendor libraries in a separate chunk
  vendor: [
    'axios',
    'babel-polyfill',
    // 'classnames',
    'debug',
    // 'immutable',
    // 'jquery',
    // 'key-mirror',
    'react',
    'react-dom',
    'react-helmet',
    'react-redux',
    // 'react-motion',
    'react-router',
    'react-router-redux',
    // 'react-tap-event-plugin',
    'redux',
    'redux-logger',
    'redux-thunk',
  ],
  bundle: [
    './node_modules/tachyons/css/tachyons.css',
    './src/styles/fonts.css',
    './src/styles/app.css',
    './src/browser.index.js',
  ],
}


// construction inspired by:
// https://github.com/webpack/webpack/issues/1189#issuecomment-156576084
const server = {
  'build/server.js': './server/index.js',
}


// Get server layouts and web components for compilation
// and place at build/layouts and build/components
// since hapi-react-views requires templates at runtime
const serverLayouts = Glob.sync('./server/views/!(*_test.js)*')
serverLayouts.forEach((file) => {

  const target = `build/views/${file.split('/').pop()}`
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
