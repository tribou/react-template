// @flow

// import { Map } from 'immutable'
// import Debug from 'debug'

// const log = Debug('my-app')


export const initialState: Object = {
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


function reducer (state: ?Object = initialState, action: Object)
  : ?Object {

  switch (action.type) {

    default:
      return state

  }

}


export default reducer
