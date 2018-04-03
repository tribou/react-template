// @flow
// Contains API-specific logic for the API service we're using
import FetchPonyfill from "fetch-ponyfill";
import Debug from "debug";
import { getAuthToken } from "src/helpers/auth";
import env from "config/env";

const { fetch } = FetchPonyfill();
const log = Debug("my-app:helpers:api");

type FetchOpts = {
  method?: string,
  body?: string,
  headers?: Object,
  credentials?: string
};

type FetchResponse = {
  status: number,
  statusText: string,
  ok: boolean,
  headers: Object,
  url: string,
  text: () => Promise<string>,
  json: () => Promise<Object>
  // blob?: () => Promise<Blob>,
  // arrayBuffer?: () => Promise<ArrayBuffer>,
  // formData?: () => Promise<FormData>,
};

const getClient = (opts?: FetchOpts): Promise<*> =>
  getAuthToken().then(token =>
    // Defaults
    (endpoint: ?string = "", data?: ?Object) => {
      const path = endpoint || "";
      // Omit API_URL if endpoint starts with http://
      const prefix =
        path && path.substr(0, 7).indexOf("//") === -1 ? env.API_URL : "";

      return fetch(`${prefix}${path}`, {
        body: data ? JSON.stringify(data) : undefined,
        headers: {
          Authorization: token ? `Basic ${token}` : undefined,
          "Content-Type": "application/json"
        },
        ...opts
      }).then(
        response => _parseResponse(response),
        error => Promise.reject(_parseError(error))
      );
    }
  );

declare class FetchError extends Error {}

export type APIError = {
  statusCode: number,
  data: Object | string,
  error: true
};

// Standardize API error format across the app
// Decouple from implementation (here using axios)
const _parseError = (error: FetchResponse | FetchError): APIError => {
  // DEBUG: Print implementation-specific error information
  log("_parseError: %s \n %o", error);

  if (
    error &&
    error.status &&
    typeof error.status === "number" &&
    !(error instanceof Error)
  ) {
    return {
      statusCode: error.status,
      data: error.json(),
      error: true
    };
  } else if (error instanceof Error) {
    return {
      statusCode: 501,
      data: error.message,
      error: true
    };
  }

  return {
    statusCode: 501,
    data: error.toString(),
    error: true
  };
};

export type APIResponse = {
  statusCode: number,
  data: Object
};

// Standardize API response format across the app
// Decouple from implementation (here using axios)
const _parseResponse = (response: FetchResponse): Promise<APIResponse> => {
  log("_parseResponse: %o", response);

  if (!response.ok) throw new Error(response);

  return response.text().then(text => {
    try {
      return {
        statusCode: response.status,
        data: JSON.parse(text)
      };
    } catch (e) {
      return {
        statusCode: response.status,
        data: { text }
      };
    }
  });
};

// GET request factories
export const get = (
  endpoint: string,
  opts?: FetchOpts
): Promise<APIResponse | APIError> =>
  getClient(opts).then(client => client(endpoint));

// POST request factories
export const post = (
  endpoint: string,
  data: ?Object = {},
  opts?: FetchOpts
): Promise<APIResponse | APIError> =>
  getClient({ method: "POST", ...opts }).then(client => client(endpoint, data));

// PATCH request factories
export const patch = (
  endpoint: string,
  data: ?Object = {},
  opts?: FetchOpts
): Promise<APIResponse | APIError> =>
  getClient({ method: "PATCH", ...opts }).then(client =>
    client(endpoint, data)
  );

// PUT request factories
export const put = (
  endpoint: string,
  data: ?Object = {},
  opts?: FetchOpts
): Promise<APIResponse | APIError> =>
  getClient({ method: "PUT", ...opts }).then(client => client(endpoint, data));

// DELETE request factories
export const del = (
  endpoint: string,
  opts?: FetchOpts
): Promise<APIResponse | APIError> =>
  getClient({ method: "DELETE", ...opts }).then(client => client(endpoint));

export const mock = (data: Object, delay: number = 500): Promise<APIResponse> =>
  new Promise(resolve =>
    setTimeout(
      () =>
        resolve(
          _parseResponse({
            status: 200,
            statusText: "Success",
            data,
            text: () => Promise.resolve(JSON.stringify(data)),
            url: "",
            ok: true,
            json: () => Promise.resolve(data),
            headers: {}
          })
        ),
      delay
    )
  );
