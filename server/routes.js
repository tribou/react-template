// @flow
import htmlHandler from 'server/handlers/html'

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
  // robots.txt
  {
    method: 'GET',
    path: '/robots.txt',
    handler: {
      file: 'build/public/robots.txt',
    },
  },
  // Catch-all for react-router
  {
    method: 'GET',
    path: '/{param*}',
    handler: htmlHandler,
  },
]
