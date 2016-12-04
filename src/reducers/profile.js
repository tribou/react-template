// @flow
import {
  INIT_LOAD_COMPLETE,
  INIT_LOAD_START,
} from '../constants/actions'

// import { Map } from 'immutable'
// import Debug from 'debug'

// const log = Debug('my-app')


export const initialState = {
  me: [1, 2, 3, 4, 5, 6, 7],
  list: {
    '1': {
      src: 'http://lorempixel.com/100/100',
      text: 'Hi',
    },
    '2': {
      src: 'http://lorempixel.com/100/100',
      text: 'Hi',
    },
    '3': {
      src: 'http://lorempixel.com/100/100',
      text: 'Hi',
    },
    '4': {
      src: 'http://lorempixel.com/100/100',
      text: 'Hi',
    },
    '5': {
      src: 'http://lorempixel.com/100/100',
      text: 'Hi',
    },
    '6': {
      src: 'http://lorempixel.com/100/100',
      text: 'Hi',
    },
    '7': {
      src: 'http://lorempixel.com/100/100',
      text: 'Hi',
    },
    '8': {
      src: 'http://lorempixel.com/100/100',
      text: 'Hi',
    },
    '9': {
      src: 'http://lorempixel.com/100/100',
      text: 'Hi',
    },
  },
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
