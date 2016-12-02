// @flow
import {
  INIT_LOAD_START,
  INIT_LOAD_COMPLETE,
} from '../constants/actions'


// Removed from implementation until the need arises
// For now, we assume that the app arrives in loading state
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
