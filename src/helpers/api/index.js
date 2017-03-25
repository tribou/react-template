// @flow
// Contains API-specific logic for the API service we're using
import Axios from 'axios'
import Debug from 'debug'
import type { $AxiosError, $AxiosXHR } from 'axios'
import { getAuthToken } from 'src/helpers/auth'
import env from 'config/env'

const log = Debug('my-app:helpers:api')


const getClient = (): Axios.Axios => {

  const token = getAuthToken()

  // Defaults
  const config = {
    baseURL: env.API_URL,
    timeout: 15000,
    headers: {
      Authorization: token ? `Basic ${token}` : undefined,
      'Content-Type': 'application/json',
    },
  }

  log('Set baseURL: %s', env.API_URL)

  return Axios.create(config)

}


export type APIError = {
  statusCode: number,
  data: Object,
  error: boolean,
}

// Standardize API error format across the app
// Decouple from implementation (here using axios)
const _parseError = (
  error: $AxiosError<*>,
): APIError | string => {

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
export const get = (endpoint: string): Promise<APIResponse | APIError> => {

  const client = getClient()
  return client.get(endpoint)
    .then((response) => {

      return _parseResponse(response)

    })
    .catch((error) => {

      return Promise.reject(_parseError(error))

    })

}

// POST request factories
export const post = (endpoint: string, data: ?Object): Promise<*> => {

  const client = getClient()
  return client.post(endpoint, data)
    .then((response) => {

      return _parseResponse(response)

    })
    .catch((error) => {

      return Promise.reject(_parseError(error))

    })

}


// PATCH request factories
export const patch = (endpoint: string, data: ?Object): Promise<*> => {

  const client = getClient()
  return client.patch(endpoint, data)
    .then((response) => {

      return _parseResponse(response)

    })
    .catch((error) => {

      return Promise.reject(_parseError(error))

    })

}


// DELETE request factories
export const del = (endpoint: string): Promise<*> => {

  const client = getClient()
  return client.delete(endpoint)
    .then((response) => {

      return _parseResponse(response)

    })
    .catch((error) => {

      return Promise.reject(_parseError(error))

    })

}
