// @flow
const Path = require('path')


function getResolve () {

  // eslint-disable-next-line arrow-parens
  return (context /* : Object */) => ({
    resolve: {
      alias: {
        config: Path.resolve(__dirname, '../../../config'),
        src: Path.resolve(__dirname, '../../../src'),
        server: Path.resolve(__dirname, '../../../server'),
        static: Path.resolve(__dirname, '../../../static'),
      },
      extensions: [
        '.js',
        '.json',
        '.web.js',
      ],
    },
  })

}


module.exports = getResolve
