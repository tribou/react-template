// @flow
import 'babel-polyfill'
import Hapi from 'hapi'
import HapiReactViews from 'hapi-react-views'
import Good from 'good'
import Inert from 'inert'
import Vision from 'vision'
import Routes from 'server/routes'

// Plugins
import HttpsRedirectPlugin from 'server/plugins/httpsRedirect'
import HealthCheckPlugin from 'server/plugins/health'


const { NODE_ENV, PORT } = process.env

const server = new Hapi.Server()

server.connection({
  host: '0.0.0.0',
  port: PORT || 8000,
  routes: {
    cors: true,
    security: {
      xframe: 'sameorigin',
    },
  },
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
  HttpsRedirectPlugin,
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

      if (NODE_ENV) server.log(['info'], `NODE_ENV: ${NODE_ENV}`)
      server.log(['info'], `Server running at: ${server.info.uri}`)

      if (done) done()

      return server

    })

  })

}

startServer()


export default startServer
