// @flow
// eslint-disable-next-line import/no-extraneous-dependencies
import offlineConfig from '@redux-offline/redux-offline/lib/defaults'
import { isBrowser } from 'config/env'

const noop = (s: any) => {}

export default {
  ...offlineConfig,
  persist: isBrowser()
    ? offlineConfig.persist
    : noop,
  persistOptions: {
    ...offlineConfig.persistOptions,
    blacklist: [
      'form',
      'init',
      'ui',
    ],
  },
}
