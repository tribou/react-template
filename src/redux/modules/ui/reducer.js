// @flow
import { DISPLAY_ERROR } from 'src/redux/middleware/errorDisplay'
import {
  CLOSE_SIDEBAR,
  OPEN_SIDEBAR,
  START_LOADING,
  STOP_LOADING,
} from './consts'
import type { UIState } from './types'
import initialState from './initialState'

// import Debug from 'debug'
// const log = Debug('my-app:redux:modules:ui')

function reducer (state: UIState = initialState, action: GlobalFSA<any>) {

  switch (action.type) {

    case DISPLAY_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    case CLOSE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: false,
      }

    case OPEN_SIDEBAR:
      return {
        ...state,
        sidebarOpen: true,
      }

    case START_LOADING:
      return {
        ...state,
        showLoading: true,
      }

    case STOP_LOADING:
      return {
        ...state,
        showLoading: false,
      }

    default:
      return state

  }

}

export default reducer
