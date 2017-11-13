// @flow
import 'babel-polyfill'
import 'make-promises-safe'
import Hapi from 'hapi'
import HapiReactViews from 'hapi-react-views'
import Inert from 'inert'
import Vision from 'vision'

// Plugins
import HttpsRedirectPlugin from 'server/plugins/httpsRedirect'
import HealthCheckPlugin from 'server/plugins/health'
import Logger from 'server/plugins/logger'
import Robots from 'server/plugins/routes/robots'
import StaticContent from 'server/plugins/routes/staticContent'
import DefaultRoute from 'server/plugins/routes/default'


const { NODE_ENV, PORT } = process.env


// Register Hapi plugins
const plugins = [
  Inert,
  Vision,
  HttpsRedirectPlugin,
  HealthCheckPlugin,
  Logger,
  Robots,
  StaticContent,
  DefaultRoute,
]


async function startServer () {

  const server = new Hapi.Server({
    host: '0.0.0.0',
    port: PORT || 8000,
    routes: {
      cors: true,
      security: {
        xframe: 'sameorigin',
      },
    },
  })

  await server.register(plugins)

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

  await server.start()

  console.log('\n')
  console.log(`Server running at ${server.info.uri}`)
  if (NODE_ENV) console.log(`NODE_ENV: ${NODE_ENV}`)
  console.log('\n')

}

startServer()


export default startServer
