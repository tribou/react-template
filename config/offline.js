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
  version: `v${version}-${new Date().toISOString()}`,
  autoUpdate: true,
  publicPath: '/',
  externals: offlineRoutes,
  excludes: [
    '**/.*',
    '**/*.map',
    '**/*.map.gz',
    'robots.txt',
    'assets.json',
    '../chunk-manifest.json',
  ],

  // If publicPath is a subdirectory
  rewrites: asset => (

    // prefix with /static/ unless webpack asset is a page route
    offlineRoutes.indexOf(asset) === -1
      ? `/static/${asset}`
      : asset
  ),

}
