// @flow


function getTarget (target/* : ?string */) {

  return ({ platform }
    /* : { platform: Platform } */
  ) => {

    if (target) return { target }

    if (platform === 'browser') {

      return { target: 'web' }

    }
    else if (platform === 'desktop') {

      return { target: 'electron-renderer' }

    }
    else if (platform === 'server') {

      return { target: 'node' }

    }

    throw new Error('Unsupported platform and no target passed')

  }

}


module.exports = getTarget
