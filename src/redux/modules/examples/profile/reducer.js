// @flow
// Non-shallow reducer state example needs nested reducers
// import Debug from 'debug'
import get from 'lodash/get'
import { GET_PROFILE, GET_PROFILE_FULFILLED, GET_PROFILE_REJECTED } from './consts'
import type { ProfileState } from './types'
import initialState from './initialState'

// const log = Debug('my-app:redux:modules:profile')

function reducer (state: ProfileState = initialState, action: GlobalFSA<any>) {

  switch (action.type) {

    case GET_PROFILE:
      return {
        ...state,
        isFetching: true,
      }

    case GET_PROFILE_FULFILLED:
      return {
        ...state,
        data: get(action, 'payload.me'),
        error: '',
        isFetching: false,
      }

    case GET_PROFILE_REJECTED:
      return {
        ...state,
        data: initialState.data,
        error: get(action, 'payload.statusCode'),
        isFetching: false,
      }

    default:
      return state

  }

}

export default reducer
