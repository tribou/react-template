// @flow
//
// Customize request/response server logs
//

// Hapi plugin signature
export default {
  name: 'logger',
  version: '1.0.0',
  register: (server: Object, options: Object) =>
    server.ext('onRequest', (request: Object, h: Object) => {

      const time = new Date().toISOString()
      const method = request.method.toUpperCase()
      console.log(`${time} ${method} ${request.url.path}`)
      return h.continue

    }),
}
