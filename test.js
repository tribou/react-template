/* eslint-disable */
// Bootstrap file to require each tape test
import glob from 'glob'

function noop (): null {

  return null

}
require.extensions['.css'] = noop

glob.sync('*(server|src|web)/**/*_test.js', { realpath: true, cwd: __dirname })
.forEach(require)
