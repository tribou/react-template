// @flow
const Path = require('path')


function getResolve () {

  // eslint-disable-next-line arrow-parens
  return ({ platform }/* : { platform: Platform } */) => {

    const extensions = platform === 'desktop'
      ? ['.desktop.js', '.js', '.json']
      : ['.web.js', '.js', '.json']

    return {
      resolve: {
        extensions,
        alias: {
          config: Path.resolve(__dirname, '../../../config'),
          src: Path.resolve(__dirname, '../../../src'),
          server: Path.resolve(__dirname, '../../../server'),
          static: Path.resolve(__dirname, '../../../static'),
        },
      },
    }

  }

}


module.exports = getResolve
