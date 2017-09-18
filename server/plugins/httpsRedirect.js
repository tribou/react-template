// @flow
const { NODE_ENV } = process.env

// Hapi plugin signature
const HttpsRedirectPlugin = (
  server: Object, options: Object, next: Function
) => {

  // Redirect to HTTPS
  server.ext('onRequest', (request, reply) => {

    // Only in production
    if (NODE_ENV !== 'production') return reply.continue()

    const redirect = request.headers['x-forwarded-proto'] === 'http'
    const host = request.headers['x-forwarded-host'] || request.headers.host

    const path = `https://${host}${request.url.path}`

    if (redirect) {

      server.log(['info', 'http_redirect'], path)
      return reply()
        .redirect(path)
        .code(301)

    }
    return reply.continue()

  })

  next()

}

HttpsRedirectPlugin.attributes = {
  name: 'httpsRedirect',
  version: '1.0.0',
}


export default HttpsRedirectPlugin
