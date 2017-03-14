// @flow
const getConfig = require('./config/postcss')

module.exports = {
  plugins: getConfig(),
}
