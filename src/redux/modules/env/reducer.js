// @flow
// Empty reducer for now since we probably don't want to change
// it in the browser
import type { EnvState } from 'config/env'
import initialState from './initialState'

function reducer (state: Object = initialState, action: Object): EnvState {

  return state

}

export default reducer
