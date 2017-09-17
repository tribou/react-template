// @flow
import Cookies from 'cookies-js'
import { Base64 } from 'js-base64'
import env, { isBrowser } from 'config/env'

const { SECURE_COOKIE } = env

const domain = isBrowser()
  ? window.location.hostname
  : null


export const serialize = (string: string): string =>
  Base64.encode(string)


export const deserialize = (string: string): string =>
  Base64.decode(string)


export const setItem = async function setItem (
  key: string, value: string, expires?: number
) {

  await Cookies.set(key, serialize(value), {
    secure: SECURE_COOKIE,
    domain,
    expires,
  })

}


export const getItem = async function getItem (key: string) {

  const value: ?string = await Cookies.get(key)
  if (value) return deserialize(value)
  return value

}


export const removeItem = async function removeItem (key: string) {

  await Cookies.expire(key, {
    domain,
  })

}
