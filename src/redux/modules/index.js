// @flow
import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

// Types
import type { EnvState } from 'config/env'
import type { RequestState } from 'src/redux/modules/request/types'
import type { InitState } from 'src/redux/modules/init/types'
import type { AuthState } from 'src/redux/modules/auth/types'
import type { UIState } from 'src/redux/modules/ui/types'

// Examples
import type { ExamplesState } from 'src/redux/modules/examples'

import env from './env/reducer'
import request from './request/reducer'
import init from './init/reducer'
import auth from './auth/reducer'
import ui from './ui/reducer'

// Examples
import examples from './examples'

export type RootReducerState = {
  env: EnvState,
  request: RequestState,
  init: InitState,
  auth: AuthState,
  ui: UIState,

  // Examples
  examples: ExamplesState,

  // redux-form
  form: Object,
  // react-router-redux
  routing: Object,
}

const rootReducer = combineReducers({
  env,
  request,
  init,
  auth,
  ui,

  // Examples
  examples,

  // redux-form
  form,
})


export default rootReducer
