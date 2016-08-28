// @flow
import htmlHandler from './handlers/html.js'

export default [
  {
    method: 'GET',
    path: '/static/{param*}',
    handler: {
      directory: {
        path: 'build/public',
        lookupCompressed: true,
      },
    },
  },
  // Service workers and app cache
  {
    method: 'GET',
    path: '/sw.js',
    handler: {
      file: 'build/public/sw.js',
    },
  },
  {
    method: 'GET',
    path: '/appcache/{param*}',
    handler: {
      directory: {
        path: 'build/public/appcache',
      },
    },
  },
  // Catch-all for react-router
  {
    method: 'GET',
    path: '/{param*}',
    handler: htmlHandler,
  },
]
