// @flow
const Path = require('path')

function eslint () {

  // eslint-disable-next-line arrow-parens
  return (context /* : Object */) => ({
    module: {
      rules: [
        {
          test: context.fileType('application/javascript'),
          enforce: 'pre',
          use: [
            {
              loader: 'eslint-loader',
              options: {
                // TODO
                // Not working after React Native relative paths
                configFile: Path.resolve(__dirname, '../../../.eslintrc.yml'),
              },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
  })

}


module.exports = eslint
