// @flow
import { getItem, setItem, removeItem } from 'src/helpers/storage'
import vars from 'config/variables'

const { appAuthCookieKey, appAuthExpirySeconds } = vars


export type AuthToken = string

export const getAuthToken = (): Promise<?AuthToken> =>
  getItem(appAuthCookieKey)

export const setAuthToken = (token: string) =>
  setItem(appAuthCookieKey, token, appAuthExpirySeconds)

export const removeAuthToken = () =>
  removeItem(appAuthCookieKey)
