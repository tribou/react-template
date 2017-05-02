// @flow
const Glob = require('glob')

const { NODE_ENV } = process.env


function getEntry (entry/* : ?(string | Object | Array<*>) */) {

  return ({ fileType, platform }
    /* : { platform: Platform, fileType: Function } */
  )/* : { entry: any } */ => {

    if (entry) return { entry }

    if (platform === 'browser') {

      return {
        entry: {
          bundle: [
            'sanitize.css/sanitize.css',
            './src/styles/fonts.css',
            './src/styles/app.css',
            './src/browser.index.js',
          ],
        },
      }

    }
    else if (platform === 'server') {

      // construction inspired by:
      // https://github.com/webpack/webpack/issues/1189#issuecomment-156576084
      const serverEntry = (NODE_ENV === 'development')
        ? ['webpack/hot/poll?500']
        : []
      const server = {
        'server.js': serverEntry.concat(['./server/index.js']),
      }

      // Get server layouts and web components for compilation
      // and place at build/layouts and build/components
      // since hapi-react-views requires templates at runtime
      const serverLayouts = Glob.sync('./server/views/!(*_test.js)*')
      serverLayouts.forEach((file) => {

        const target = `views/${file.split('/').pop()}`
        server[target] = file

      })

      return { entry: server }

    }

    throw new Error('Unsupported platform and no entry passed')

  }

}


module.exports = getEntry
