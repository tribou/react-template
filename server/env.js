// @flow

// Grab from env vars if they are set
const {

  NODE_ENV,
  API_URL,
  ROOT_URL,

} = process.env


// Set defaults
const env = {

  NODE_ENV: NODE_ENV || 'production',
  API_URL: API_URL || 'https://api.example.com',
  ROOT_URL: ROOT_URL || 'http://localhost:3000',

}

export default env
