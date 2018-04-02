// @flow
// import Debug from 'debug'
import get from 'lodash/get'
import { LOGIN, LOGOUT } from './consts'
import initialState from './initialState'
import type { AuthState } from './types'

// const log = Debug('my-app:redux:modules:auth')

function reducer (state: AuthState = initialState, action: GlobalFSA<any>) {

  switch (action.type) {

    case `${LOGIN}_PENDING`:
      return {
        ...state,
        isFetching: true,
      }

    case `${LOGIN}_FULFILLED`:
      return {
        ...state,
        token: get(action, 'payload.data.account.jwt'),
        error: '',
        isFetching: false,
      }

    case `${LOGIN}_REJECTED`:
      return {
        ...state,
        token: '',
        error: action.payload,
        isFetching: false,
      }

    case `${LOGOUT}_PENDING`:
      return {
        ...state,
        // Optimistic
        token: '',
        isFetching: true,
      }

    case `${LOGOUT}_FULFILLED`:
      return {
        ...state,
        token: '',
        error: '',
        isFetching: false,
      }

    case `${LOGOUT}_REJECTED`:
      return {
        ...state,
        // Always logout!
        token: '',
        error: action.payload,
        isFetching: false,
      }

    default:
      return state

  }

}


export default reducer
