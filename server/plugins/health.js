// @flow
//
// /health healthcheck route
//

// eslint-disable-next-line camelcase
const { npm_package_name, npm_package_version } = process.env;

// Hapi plugin signature
export default {
  name: "healthCheck",
  version: "1.0.0",
  register: (server: Object, options: Object) =>
    server.route({
      method: "GET",
      path: "/health",
      handler: () => ({
        info: server.info,
        name: npm_package_name,
        version: npm_package_version
      })
    })
};
