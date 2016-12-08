/* eslint-disable */

import type { EnvState } from '../../src/redux/modules/env'
import type { InitState } from '../../src/redux/modules/init'
import type { ProfileState } from '../../src/redux/modules/profile'


type GlobalReducerState = {
  env: EnvState,
  init: InitState,
  profile: ProfileState,
  routing: Object,
}
