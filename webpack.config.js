// @flow
const { NODE_ENV } = process.env

if (!NODE_ENV) process.env.NODE_ENV = 'production'
if (NODE_ENV !== 'development' && NODE_ENV !== 'production') {

  process.env.NODE_ENV = 'production'

}

const config = require('./config/webpack')

module.exports = config
