// @flow
import env from "config/env";

const { ROBOTS_ALLOWED } = env;

export default {
  name: "robots",
  version: "1.0.0",
  register: (server: Object) => {
    server.route({
      method: "GET",
      path: "/robots.txt",
      handler: (request, h) => {
        const robots = ROBOTS_ALLOWED
          ? "# http://www.robotstxt.org\nUser-agent: *\nDisallow: /health\n"
          : "# http://www.robotstxt.org\nUser-agent: *\nDisallow: *\n";

        return h.response(robots).type("text/plain");
      }
    });
  }
};
