// @flow
import {
  INIT_LOAD_START,
  INIT_LOAD_COMPLETE,
} from '../constants/actions'


export function loadStart (): InitAction {

  return {
    type: INIT_LOAD_START,
  }

}

export function loadComplete (): InitAction {

  return {
    type: INIT_LOAD_COMPLETE,
  }

}
