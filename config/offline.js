/* eslint-disable flowtype/require-valid-file-annotation */

'use strict'

// offline-plugin webpack plugin config
const { version } = require('../package.json')


const offlineRoutes = [
  // '/',
  // '/test',
]


module.exports = {
  AppCache: false,
  ServiceWorker: {
    events: true,
  },
  version: `v${version}-[hash]`,
  publicPath: '/',
  externals: offlineRoutes,
  excludes: [
    '**/.*',
    '**/*.map',
    'robots.txt',
  ],
  // If publicPath is a subdirectory
  rewrites: (asset) => {

    // prefix with /static/ unless webpack asset is a page route
    return offlineRoutes.indexOf(asset) === -1
      ? `/static/${asset}`
      : asset

  },
}
