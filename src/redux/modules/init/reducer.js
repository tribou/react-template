// @flow
// "Shallow" reducer state example doesn't need Immutable
import { LOAD, LOAD_SUCCESS } from './consts'
import type { InitState, InitAction } from './types'
import initialState from './initialState'

function reducer (state: InitState = initialState, action: InitAction) {

  switch (action.type) {

    case LOAD:
      return {
        ...state,
        isLoading: true,
      }

    case LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
      }

    default:
      return state

  }

}

export default reducer
