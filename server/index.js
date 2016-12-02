// @flow
import 'babel-polyfill'
import Hapi from 'hapi'
import HapiReactViews from 'hapi-react-views'
import Good from 'good'
import Inert from 'inert'
import Vision from 'vision'
import Routes from './routes'

const ENV = process.env.NODE_ENV

const server = new Hapi.Server()

server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || 8000,
  routes: {
    cors: true,
    security: true,
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

if (ENV === 'production') {

  startServer()

}


export default startServer
