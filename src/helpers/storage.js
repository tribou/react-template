// @flow
import Cookies from 'cookies-js'
import { Base64 } from 'js-base64'
import env, { isBrowser } from 'config/env'

const domain = isBrowser()
  ? window.location.hostname
  : null


const serialize = (string: string): string =>
  Base64.encode(string)


const deserialize = (string: string): string =>
  Base64.decode(string)


export const setItem = async function setItem (
  key: string, value: string, expires?: number
) {

  await Cookies.set(key, serialize(value), {
    expires,
    secure: env.SECURE_COOKIE === 'true',
    domain,
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
