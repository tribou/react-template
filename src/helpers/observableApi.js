// @flow
// Contains API-specific logic for the API service we're using
import Axios from 'axios'
import Debug from 'debug'
import { Observable } from 'rxjs'
import type { $AxiosError, $AxiosXHR } from 'axios'
import env from '../../config/env'

const log = Debug('my-app:helpers:api')


type Defaults = {
  url: string,
  token: string,
}

const defaults = {
  url: env.API_URL,
  token: '',
}

export type APIError = {
  statusCode: number,
  data: Object,
  error: boolean,
}

export type APIResponse = {
  statusCode: number,
  data: Object,
}


class API {


  axios: Axios.Axios
  token: string
  url: string


  constructor ({ url, token }: Defaults = defaults) {

    this.url = url || ''
    this.token = token || ''
    this.axios = Axios.create({
      baseURL: this.url,
      // headers: {
      //   Authorization: `Bearer ${this.token}`,
      // },
    })

    log('Set API base url: %s', this.url)

  }


  // Standardize API error format across the app
  // Decouple from implementation (here using axios)
  static _parseError = (error: $AxiosError<*>): Observable<APIError> => {

    // DEBUG: Print implementation-specific error information
    log('_parseError: %s \n %o', error, error.response)

    // _parseError is passed to Observable.catch()
    // It must throw or return another Observable
    return Observable.throw({
      statusCode: error.response.status,
      data: error.response.data,
      error: true,
    })

  }


  // Standardize API response format across the app
  // Decouple from implementation (here using axios)
  static _parseResponse = (response: $AxiosXHR<*>): APIResponse => {

    log('_parseResponse: %o', response)

    return {
      statusCode: response.status,
      data: response.data,
    }

  }


  // GET request factory
  get = (endpoint: string): Observable<*> => {

    const { axios } = this

    return Observable.fromPromise(axios.get(endpoint))
    // .do(x => log('do', x)) // Debugging
    .map(API._parseResponse)
    // .do(x => log('do', x)) // Debugging
    .catch(API._parseError)

  }


  // Get current user's profile
  getProfile = (): Observable<*> => {

    const url = '/' // api.randomuser.me
    return this.get(url)

  }


}


export default API
