// @flow


function eslint () {

  return (context/* : Object */) => {

    return {
      module: {
        rules: [
          {
            test: context.fileType('application/javascript'),
            enforce: 'pre',
            use: [
              {
                loader: 'eslint-loader',
                options: {
                  configFile: '.eslintrc.yml',
                },
              },
            ],
            exclude: /node_modules/,
          },
        ],
      },
    }

  }

}


module.exports = eslint
