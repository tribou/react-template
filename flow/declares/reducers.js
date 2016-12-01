/* eslint-disable */

type EnvState = {
  NODE_ENV: string,
  API_URL: string,
  ROOT_URL: string,
  ROLLBAR_ENV: string,
  ROLLBAR_TOKEN: string,
}

type InitState = {
  isLoading: boolean,
  loaded: boolean,
}

type InitAction = {
  type: ?string,
}

type GlobalReducerState = {
  init: InitState,
  env: EnvState,
}
