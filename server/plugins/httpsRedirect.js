// @flow
const { NODE_ENV } = process.env;

// Hapi plugin signature
export default {
  name: "httpsRedirect",
  version: "1.0.0",
  register: (server: Object, options: Object) => {
    // Redirect to HTTPS
    server.ext("onRequest", (request, h) => {
      // Only in production
      if (NODE_ENV !== "production") return h.continue;

      const redirect = request.headers["x-forwarded-proto"] === "http";
      const host = request.headers["x-forwarded-host"] || request.headers.host;

      const path = `https://${host}${request.url.path}`;

      if (redirect) {
        // Using console.log for server logs for simplicity
        /* eslint-disable-next-line no-console */
        console.log(["http_redirect"], path);
        return h
          .response()
          .redirect(path)
          .code(301);
      }
      return h.continue;
    });
  }
};
