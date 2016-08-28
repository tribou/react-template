/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable flowtype/require-parameter-type */
'use strict'
const Path = require('path')
const Autoprefixer = require('autoprefixer')
const PreCSS = require('precss')
const Calc = require('postcss-calc')
const variables = require('./src/styles/variables.js')

module.exports = function postcss () {

  return [
    PreCSS({
      variables: {
        variables,
      },
      mixins: {
        mixinFiles: Path.join(__dirname, 'src/styles/mixins', '*.css'),
      },
    }),
    Calc(),
    Autoprefixer,
  ]

}
