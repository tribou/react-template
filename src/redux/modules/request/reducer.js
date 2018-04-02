// @flow
// Empty reducer for now since we probably don't want to change
// it in the browser
import type { RequestAction, RequestState } from './types'
import initialState from './initialState'

function reducer (
  state: Object = initialState,
  action: RequestAction
): RequestState {

  return state

}

export default reducer
