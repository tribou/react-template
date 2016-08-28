// @flow
/* eslint-disable import/prefer-default-export */
import Debug from 'debug'
import Fs from 'fs'
import Path from 'path'

const log = Debug('my-app:server:utils')

function _getAssets (): BuildAssets {

  log('Reading assets.json from filesystem')
  const assetsFile = Path.resolve(__dirname, '../build/assets.json')
  try {

    return JSON.parse(Fs.readFileSync(assetsFile, 'utf-8'))

  }
  catch (error) {

    log('Error:', error)
    const emptyAssets = {
      vendor: {
        js: '',
      },
      bundle: {
        js: '',
        css: '',
      },
    }
    return emptyAssets

  }

}

// Cached for production
const Assets = _getAssets()


/**
 * Returns the parsed contents of assets.json
 *
 * @public
 * @returns {object} In development, reads and parses assets.json on every call.
 * In production, reads and parses assets.json on start-up and returns from
 * memory.
 */
export function getAssets (): BuildAssets {

  if (process.env.NODE_ENV === 'production') {

    return Assets

  }

  return _getAssets()

}
