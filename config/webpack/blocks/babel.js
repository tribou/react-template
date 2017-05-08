// @flow

function babel () {

  return (context/* : Object */) => {

    const { NODE_ENV } = process.env
    const cacheDirectory = String(NODE_ENV === 'development')

    return {
      module: {
        rules: [
          {
            test: context.fileType('application/javascript'),
            exclude: /node_modules/,
            use: `babel-loader?cacheDirectory=${cacheDirectory}`,
          },
        ],
      },
    }

  }

}


module.exports = babel
