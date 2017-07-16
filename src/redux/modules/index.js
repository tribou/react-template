// @flow
import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import env from 'src/redux/modules/env'
import request from 'src/redux/modules/request'
import init from 'src/redux/modules/init'
import auth from 'src/redux/modules/auth'
import ui from 'src/redux/modules/ui'

// Examples
import profile from 'src/redux/modules/profile'
import todos from 'src/redux/modules/todos'


// Types
import type { EnvState } from 'config/env'
import type { RequestState } from 'src/redux/modules/request'
import type { InitState } from 'src/redux/modules/init'
import type { AuthState } from 'src/redux/modules/auth'
import type { UIState } from 'src/redux/modules/ui'

// Examples
import type { ProfileState } from 'src/redux/modules/profile'
import type { TodosState } from 'src/redux/modules/todos'


export type RootReducerState = {
  env: EnvState,
  request: RequestState,
  init: InitState,
  auth: AuthState,
  ui: UIState,

  // Examples
  profile: ProfileState,
  todos: TodosState,

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
  profile,
  todos,

  // redux-form
  form,
})


export default rootReducer
