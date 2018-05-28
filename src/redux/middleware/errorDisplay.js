// @flow
import env from "config/env";
import type { APIError } from "src/helpers/api";

const { SHOW_ERRORS } = env;

export const DISPLAY_ERROR = "my-app/errorDisplay/DISPLAY_ERROR";

type Payload = string | APIError;

const errorDisplay = (store: Object) => (next: Function) => (
  action: GlobalFSA<Payload>
) => {
  if (!SHOW_ERRORS) return next(action);
  if (action && action.error) {
    let message = "An error has occurred.";

    // If error instance
    if (action.payload instanceof Error) {
      ({ message } = action.payload);
    } else if (typeof action.payload === "string") {
      message = action.payload;
    } else if (action.payload && action.payload.error) {
      // If error message was parsed from API
      message = action.payload.data;
    }

    store.dispatch({
      type: DISPLAY_ERROR,
      // return a new object each time
      payload: { message },
      meta: { error: { action } }
    });
  }

  return next(action);
};

export default errorDisplay;
