// @flow
// Empty reducer for now since we probably don't want to change
// it in the browser

import type { EnvState } from '../../../config/env'

type EnvAction = Object


export const initialState: Object = {
}

function reducer (state: Object = initialState, action: EnvAction): EnvState {

  return state

}


export default reducer
