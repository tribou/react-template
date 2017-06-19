// @flow
import Cookies from 'cookies-js'
import { Base64 } from 'js-base64'
import Debug from 'debug'
import env, { isBrowser } from 'config/env'
import vars from 'config/variables'
import { parse, stringify } from 'qs'

const log = Debug('my-app:helpers:auth')
const { appAuthCookieKey, appAuthExpirySeconds } = vars


export const serializeCookie = (string: string): string =>
  Base64.encode(string)


export const deserializeCookie = (string: string): string =>
  Base64.decode(string)


export type AuthToken = string

export const getAuthToken = (): ?AuthToken => {

  if (isBrowser()) {

    const authCookie: ?string = Cookies.get(appAuthCookieKey)

    if (authCookie) return deserializeCookie(authCookie)
    return undefined

  }
  return undefined

}


export const setAuthToken = (token: string) => {

  if (isBrowser()) {

    const authCookie: ?string = serializeCookie(token)
    return Cookies.set(appAuthCookieKey, authCookie, {
      domain: window.location.hostname,
      expires: appAuthExpirySeconds,
      secure: env.SECURE_COOKIE === 'true',
    })

  }

  throw new Error('setAuthToken not implemented for this environment')

}


export const removeAuthToken = () => {

  if (isBrowser()) {

    return Cookies.expire(appAuthCookieKey, {
      domain: window.location.hostname,
    })

  }

  throw new Error('removeAuthToken not implemented for this environment')

}


export const requireAuth = (
  getToken: Function, location: Object, history: Object
) => {

  log('authToken: %j', getToken())
  if (!getToken()) {

    let query = {
      login: true,
      redirect: location.pathname,
    }
    if (location.search && location.search.length > 0) {

      const prev = parse(location.search.substr(1))
      query = {
        ...query,
        ...prev,
      }

    }

    const search = stringify(query)

    history.replace({
      pathname: '/home',
      search: `?${search}`,
    })

  }

}
