// @flow
import {
  INIT_LOAD_FAIL,
  INIT_LOAD_START,
  INIT_LOAD_SUCCESS,
} from '../constants/actions'
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

  switch (action.type) {


    case INIT_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
      }

    case INIT_LOAD_START:
      return {
        ...state,
        isLoading: true,
      }

    case INIT_LOAD_FAIL:
      return {
        ...state,
        isLoading: false,
        loaded: false,
      }


    default:
      return state

  }

}


export default init
