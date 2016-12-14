/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable flowtype/require-parameter-type */

'use strict'

const Path = require('path')
const Autoprefixer = require('autoprefixer')
const PreCSS = require('precss')
const Calc = require('postcss-calc')
const variables = require('../config/variables')

// Get context at startup
const mixinsFiles = Path.join(__dirname, '../src/styles/mixins', '*.css')


module.exports = function postcss () {

  return [
    PreCSS({
      variables: {
        variables,
      },
      mixins: {
        mixinsFiles,
      },
    }),
    Calc(),
    Autoprefixer,
  ]

}
