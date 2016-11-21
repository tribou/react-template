// @flow
import {
  INIT_LOAD_FAIL,
  INIT_LOAD_START,
  INIT_LOAD_SUCCESS,
} from '../constants/actions'


export function loadStart (): InitAction {

  return {
    type: INIT_LOAD_START,
  }

}

export function loadSuccess (): InitAction {

  return {
    type: INIT_LOAD_SUCCESS,
  }

}

export function loadFail (): InitAction {

  return {
    type: INIT_LOAD_FAIL,
  }

}
