/* eslint-disable */

import type { EnvState } from 'redux/modules/env'
import type { RequestState } from 'redux/modules/request'
import type { InitState } from 'redux/modules/init'
import type { AuthState } from 'redux/modules/auth'
import type { UIState } from 'redux/modules/ui'

// Examples
import type { ProfileState } from 'redux/modules/profile'
import type { InitialState as TodosState } from 'redux/modules/todos'


type GlobalReducerState = {
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

type GlobalFSA<T> = {
  type: string,
  payload: T,
  error?: boolean,
  meta?: Object,
}

type GlobalGetState = () => GlobalReducerState
type GlobalThunkAction = (
  dispatch: GlobalDispatch<*>, getState: GlobalGetState
) => any
type GlobalPromiseAction<T> = Promise<GlobalFSA<T>>
type GlobalDispatch<T> = (
  action: GlobalFSA<T> | GlobalThunkAction | GlobalPromiseAction<T>
) => any
