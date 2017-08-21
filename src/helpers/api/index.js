// @flow
// Contains API-specific logic for the API service we're using
import Axios from 'axios'
import Debug from 'debug'
import type { $AxiosError, $AxiosXHR, $AxiosXHRConfigBase } from 'axios'
import { getAuthToken } from 'src/helpers/auth'
import env from 'config/env'

const log = Debug('my-app:helpers:api')


const getClient = (): Promise<Axios.Axios> =>
  getAuthToken()
    .then(token =>

      // Defaults
      Axios.create({
        baseURL: env.API_URL,
        timeout: 10000,
        headers: {
          Authorization: token ? `Basic ${token}` : undefined,
          'Content-Type': 'application/json',
        },
      }))


export type APIError = {
  statusCode: number,
  data: Object,
  error: boolean,
} | string

// Standardize API error format across the app
// Decouple from implementation (here using axios)
const _parseError = (
  error: $AxiosError<*>,
): APIError => {

  // DEBUG: Print implementation-specific error information
  log('_parseError: %s \n %o', error)

  if (error && error.response) {

    return {
      statusCode: error.response.status,
      data: error.response.data,
      error: true,
    }

  }
  else if (error instanceof Error) {

    return error.message

  }

  return `ERROR: ${error.toString()}`

}


export type APIResponse = {
  statusCode: number,
  data: Object,
}

// Standardize API response format across the app
// Decouple from implementation (here using axios)
const _parseResponse = (response: $AxiosXHR<*>): APIResponse => {

  log('_parseResponse: %o', response)

  return {
    statusCode: response.status,
    data: response.data,
  }

}


// GET request factories
export const get = (
  endpoint: string, opts?: $AxiosXHRConfigBase<*>,
): Promise<APIResponse | APIError> =>
  getClient()
    .then(client =>
      client.get(endpoint, opts)
        .then(response => _parseResponse(response))
        .catch(error => Promise.reject(_parseError(error)))
    )


// POST request factories
export const post = (
  endpoint: string, data: ?Object = {}, opts?: $AxiosXHRConfigBase<*>,
): Promise<APIResponse | APIError> =>
  getClient()
    .then(client =>
      client.post(endpoint, data, opts)
        .then(response => _parseResponse(response))
        .catch(error => Promise.reject(_parseError(error)))
    )


// PATCH request factories
export const patch = (
  endpoint: string, data: ?Object = {}, opts?: $AxiosXHRConfigBase<*>,
): Promise<APIResponse | APIError> =>
  getClient()
    .then(client =>
      client.patch(endpoint, data, opts)
        .then(response => _parseResponse(response))
        .catch(error => Promise.reject(_parseError(error)))
    )


// PUT request factories
export const put = (
  endpoint: string, data: ?Object = {}, opts?: $AxiosXHRConfigBase<*>,
): Promise<APIResponse | APIError> =>
  getClient()
    .then(client =>
      client.put(endpoint, data, opts)
        .then(response => _parseResponse(response))
        .catch(error => Promise.reject(_parseError(error)))
    )


// DELETE request factories
export const del = (
  endpoint: string, opts?: $AxiosXHRConfigBase<*>,
): Promise<APIResponse | APIError> =>
  getClient()
    .then(client =>
      client.delete(endpoint, opts)
        .then(response => _parseResponse(response))
        .catch(error => Promise.reject(_parseError(error)))
    )


export const mock = (
  data: Object,
  delay: number = 500,
): Promise<APIResponse> => new Promise(resolve =>
  setTimeout(() => resolve(_parseResponse({
    status: 200,
    data,
  })), delay))
