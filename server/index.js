// @flow
import 'babel-polyfill'
import Hapi from 'hapi'
import HapiReactViews from 'hapi-react-views'
import Good from 'good'
import Inert from 'inert'
import Vision from 'vision'
import Routes from 'server/routes'

// Plugins
import HealthCheckPlugin from 'server/plugins/health'


const ENV = process.env.NODE_ENV

const server = new Hapi.Server()

server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || 8000,
  routes: {
    cors: true,
    security: {
      xframe: 'sameorigin',
    },
  },
})

// Redirect to HTTPS
server.ext('onRequest', (request, reply) => {

  if (ENV !== 'production') return reply.continue()

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

// Register Hapi plugins
const plugins = [
  {
    register: Inert,
  },
  {
    register: Vision,
  },
  {
    register: Good,
    options: {
      ops: {
        interval: 10000,
      },
      reporters: {
        console: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{
            // ops: '*',
            log: '*',
            request: '*',
            response: '*',
            error: '*',
          }],
        }, {
          module: 'good-console',
          args: [{
            format: 'YYYY-MM-DDTHH:mm:ss.SSS[Z]',
          }],
        }, 'stdout'],
      },
    },
  },
  HealthCheckPlugin,
]


function startServer (done: ?Function): Object {

  return server.register(plugins, (errorRegister: string): Object => {

    if (errorRegister) return server.log(['error'], errorRegister)

    server.views({
      engines: {
        js: HapiReactViews,
      },
      // relative to output file in build/ directory
      relativeTo: __dirname,
      // path: 'components',
      path: 'views',
      compileOptions: {
        // layout: 'Html.js',
        // layoutPath: Path.resolve(__dirname, 'layouts'),
        renderMethod: 'renderToString',
      },
    })

    server.route(Routes)

    return server.start((): any => {

      if (ENV) {

        server.log(['info'], `NODE_ENV: ${ENV}`)

      }
      server.log(['info'], `Server running at: ${server.info.uri}`)

      if (done) {

        done()

      }
      return server

    })

  })

}

startServer()


export default startServer
