/* eslint-disable */

import type { EnvState } from '../../src/redux/modules/env'
import type { RequestState } from '../../src/redux/modules/request'
import type { InitState } from '../../src/redux/modules/init'
import type { ProfileState } from '../../src/redux/modules/profile'
import type { TodosState } from '../../src/redux/modules/todos'


type GlobalReducerState = {
  env: EnvState,
  request: RequestState,
  init: InitState,

  // Examples
  profile: ProfileState,
  todos: TodosState,

  // react-router-redux
  routing: Object,
}

type GlobalFSA<T> = {
  type: string,
  payload: T,
  error?: boolean,
  meta?: Object,
}
