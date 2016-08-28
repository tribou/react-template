// @flow
import {
  INIT_LOAD_FAIL,
  INIT_LOAD_START,
  INIT_LOAD_SUCCESS,
} from '../constants/actions.js'
// import { Map } from 'immutable'
// import Debug from 'debug'

// const log = Debug('my-app')


export const initialState = {
  isLoading: false,
  loaded: false,
}


function init (
  state: ?InitState = initialState,
  action: InitAction
): ?InitState {

  // TODO: use global error reducer to catch all failure actions
  // if (action.error) {

  //   log('error:', action.error)

  // }

  switch (action.type) {


    case INIT_LOAD_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        loaded: true,
      })

    case INIT_LOAD_START:
      return Object.assign({}, state, {
        isLoading: true,
        loaded: false,
      })

    case INIT_LOAD_FAIL:
      return Object.assign({}, state, {
        isLoading: false,
        loaded: false,
      })


    default:
      return state

  }

}


export default init
