// @flow
import vars from 'config/variables'

const { fobReduxStateVar } = vars


export type EnvState = {

  NODE_ENV: string,

  API_URL: string,
  ROOT_URL: string,
  USE_MOCK_API: boolean,
  SECURE_COOKIE: boolean,
  SHOW_ERRORS: boolean,
  ROBOTS_ALLOWED: boolean,

  ROLLBAR_ENV: string,
  ROLLBAR_TOKEN: string,

}


// Grab from env vars if they are set
const {

  NODE_ENV,

  API_URL,
  ROOT_URL,
  USE_MOCK_API,
  SECURE_COOKIE,
  SHOW_ERRORS,
  ROBOTS_ALLOWED,

  ROLLBAR_ENV,
  ROLLBAR_TOKEN,

} = process.env


// Set defaults
const env: EnvState = {

  // Since NODE_ENV is automatically used by many plugins, we can't ensure it
  // will produce dev/prod parity by itself. Consequently, we need to use
  // separate ENVs for apps.
  NODE_ENV: NODE_ENV || 'production',

  // App settings
  API_URL: API_URL || 'https://api.randomuser.me',
  ROOT_URL: ROOT_URL || 'http://localhost:3000',
  USE_MOCK_API: USE_MOCK_API === 'true',
  SECURE_COOKIE: SECURE_COOKIE === 'true',
  SHOW_ERRORS: SHOW_ERRORS === 'true',
  ROBOTS_ALLOWED: ROBOTS_ALLOWED === 'true',

  // Rollbar.io
  ROLLBAR_ENV: ROLLBAR_ENV || 'development',
  ROLLBAR_TOKEN: ROLLBAR_TOKEN || '95a94db7f6d64680b1c971f63e322f10',

}


export const isBrowser = (): boolean => Boolean(
  typeof window !== 'undefined' && window.document
)


const getEnv = (): EnvState => {

  if (NODE_ENV === 'test') return env
  if (isBrowser() && window[fobReduxStateVar]) {

    return window[fobReduxStateVar].env

  }
  return env

}


const dynamicEnv = getEnv()


export default dynamicEnv
