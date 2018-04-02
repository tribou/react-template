// @flow
// Non-shallow reducer state example needs Immutable
// Async actions need redux-observable epics
import { LOGOUT } from '../../auth/consts'
import { GET_TODOS, SET_FILTER } from './consts'
import type { TodosState } from './types'
import initialState from './initialState'

// REDUCER
function reducer (state: TodosState = initialState, action: GlobalFSA<any>) {

  switch (action.type) {

    case SET_FILTER:
      return {
        ...state,
        filter: action.payload.filter,
      }

    case `${GET_TODOS}_PENDING`:
      return {
        ...state,
        isFetching: true,
      }

    case `${GET_TODOS}_FULFILLED`:
      return {
        ...state,
        list: action.payload.data.list,
        isFetching: false,
        error: initialState.error,
      }

    case `${GET_TODOS}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      }

    case `${LOGOUT}_PENDING`:
      return {
        ...initialState,
        isFetching: true,
      }

    case `${LOGOUT}_FULFILLED`:
      return {
        ...initialState,
        isFetching: false,
      }

    case `${LOGOUT}_REJECTED`:
      return {
        ...initialState,
        error: action.payload,
      }

    default:
      return state

  }

}

// EPICS
// variable$ notation indicates an event stream
// https://redux-observable.js.org/docs/basics/Epics.html

export default reducer
