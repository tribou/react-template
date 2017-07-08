// @flow
//
// /health healthcheck route
//

const { npm_package_name, npm_package_version } = process.env


// Hapi plugin signature
const HealthCheckPlugin = (server: Object, options: Object, next: Function) => {

  server.route({
    method: 'GET',
    path: '/health',
    handler: (request, reply) => (
      reply({
        info: server.info,
        name: npm_package_name,
        version: npm_package_version,
      })
    ),
  })

  next()

}

HealthCheckPlugin.attributes = {
  name: 'healthCheck',
  version: '1.0.0',
}


export default HealthCheckPlugin
