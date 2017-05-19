// @flow

export type EnvState = {

  NODE_ENV: string,

  API_URL: string,
  ROOT_URL: string,
  SECURE_COOKIE: boolean,
  SHOW_ERRORS: boolean,

  ROLLBAR_ENV: string,
  ROLLBAR_TOKEN: string,

}


// Grab from env vars if they are set
const {

  NODE_ENV,

  API_URL,
  ROOT_URL,
  SECURE_COOKIE,
  SHOW_ERRORS,

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
  SECURE_COOKIE: SECURE_COOKIE === 'true' || false,
  SHOW_ERRORS: SHOW_ERRORS === 'true' || true,

  // Rollbar.io
  ROLLBAR_ENV: ROLLBAR_ENV || 'development',
  ROLLBAR_TOKEN: ROLLBAR_TOKEN || '95a94db7f6d64680b1c971f63e322f10',

}


export const isBrowser = (): boolean => {

  return Boolean(typeof window !== 'undefined' && window.document)

}


export default env
