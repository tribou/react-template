// @flow

// Grab from env vars if they are set
const {

  NODE_ENV,

  // App settings
  API_URL,
  ROOT_URL,

  // Rollbar.io
  ROLLBAR_ENV,
  ROLLBAR_TOKEN,

} = process.env


// Set defaults
const env = {

  // Since NODE_ENV is automatically used by many plugins, we can't ensure it
  // will produce dev/prod parity by itself. Consequently, we need to use
  // separate ENVs for apps.
  NODE_ENV: NODE_ENV || 'production',

  // App settings
  API_URL: API_URL || 'https://api.example.com',
  ROOT_URL: ROOT_URL || 'http://localhost:3000',

  // Rollbar.io
  ROLLBAR_ENV: ROLLBAR_ENV || 'development',
  ROLLBAR_TOKEN: ROLLBAR_TOKEN || '95a94db7f6d64680b1c971f63e322f10',


}

export default env
