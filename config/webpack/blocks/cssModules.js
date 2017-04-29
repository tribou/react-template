// @flow
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const getPostCSSPlugins = require('../../postcss')

const { NODE_ENV } = process.env


function cssModules () {

  return (context/* : Object */) => {

    context.fileType.add({
      'text/x-css-vendor': /node_modules.*\.css$/,
    })

    const localIdentName = String(NODE_ENV) === 'production'
      ? '[hash:base64:10]'
      : '[path]__[name]__[local]__[hash:base64:3]'

    const postcss = getPostCSSPlugins()

    return {

      module: {
        rules: [
          {
            // CSS Modules
            test: context.fileType('text/css'),
            use: ExtractTextPlugin.extract({

              use: `css-loader?${[
                'modules',
                'importLoaders=1',
                `localIdentName=${localIdentName}`,
              ].join('&')}!postcss-loader`,

            }),
            exclude: /node_modules/,
          },
          {
            // Vendor CSS
            test: context.fileType('text/x-css-vendor'),
            use: ExtractTextPlugin.extract({

              use: `css-loader?${[
                'importLoaders=1',
              ].join('&')}!postcss-loader`,

            }),
          },
        ],
      },

      plugins: [
        new context.webpack.LoaderOptionsPlugin({
          options: {
            postcss,
          },
        }),
        new ExtractTextPlugin({
          filename: 'styles.css',
          allChunks: true,
        }),
      ],
    }

  }

}


module.exports = cssModules
