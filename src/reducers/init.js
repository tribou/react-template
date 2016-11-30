// @flow
import {
  INIT_LOAD_COMPLETE,
  INIT_LOAD_START,
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


    case INIT_LOAD_START:
      return {
        ...state,
        isLoading: true,
      }

    case INIT_LOAD_COMPLETE:
      return {
        ...state,
        isLoading: false,
        loaded: true,
      }


    default:
      return state

  }

}


export default init
