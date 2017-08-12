// @flow
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const plugins = require('../../postcss')


function wrapExtract ({ platform, use }
  /* { platform: Platform, use: Array<Object> } */
) {

  const wrapped = ExtractTextPlugin.extract({
    use,
  })

  return platform === 'browser'
    ? wrapped
    : use

}

function getRule ({ fileType, platform, modules, NODE_ENV }
  /* {
   * fileType: Function,
   * platform: Platform,
   * modules: boolean,
   * NODE_ENV: 'development' | 'production',
   * } */
) {

  const test = modules
    ? fileType('text/css')
    : fileType('text/x-css-vendor')

  const exclude = modules
    ? /node_modules/
    : undefined

  const loader = platform === 'server'
    ? 'css-loader/locals'
    : 'css-loader'

  const localIdentName = NODE_ENV === 'production'
    ? '[hash:base64:8]'
    : '[path][name]__[local]__[hash:base64:3]'

  const importLoaders = platform === 'server'
    ? 0
    : 1

  const use = [
    {
      loader,
      options: {
        importLoaders,
        minimize: NODE_ENV === 'production',
        modules,
        localIdentName,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins,
      },
    },
  ]

  return {
    test,
    use: wrapExtract({ platform, use }),
    exclude,
  }

}

function cssModules () {

  return ({ fileType, platform, webpack }
  /* : { fileType: Function, platform: Platform, webpack: Object } */
  ) => {

    const { NODE_ENV } = process.env

    fileType.add({
      'text/x-css-vendor': /node_modules.*\.css$/,
    })

    const config = {

      module: {
        rules: [
          getRule({ fileType, platform, NODE_ENV, modules: true }),
          getRule({ fileType, platform, NODE_ENV, modules: false }),
        ],
      },
    }

    if (platform === 'browser') {

      return Object.assign({}, config, {
        plugins: [
          new ExtractTextPlugin({
            filename: 'styles.css',
            allChunks: true,
          }),
        ],
      })

    }

    return config

  }

}


module.exports = cssModules
