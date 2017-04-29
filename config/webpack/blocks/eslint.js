// @flow


function eslint () {

  return (context/* : Object */) => {

    return {
      module: {
        rules: [
          {
            test: context.fileType('application/javascript'),
            exclude: /node_modules/,
            loader: 'eslint-loader',
            enforce: 'pre',
            options: {
              configFile: '.eslintrc.yml',
            },
          },
        ],
      },
    }

  }

}


module.exports = eslint
