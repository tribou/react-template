// @flow
import env from "./env";

export default {
  accessToken: env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  verbose: env.ROLLBAR_ENV === "development",
  payload: {
    environment: env.ROLLBAR_ENV
  }
};
