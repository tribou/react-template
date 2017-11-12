// @flow

export default {
  name: 'staticContent',
  version: '1.0.0',
  register: (server: Object) => {

    server.route([
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
    ])

  },
}
