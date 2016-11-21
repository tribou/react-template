/* eslint-disable */

type InitState = {
  isLoading: boolean,
  loaded: boolean,
}

type InitAction = {
  type: ?string,
}

type GlobalReducerState = {
  init: InitState,
  env: Object,
}
