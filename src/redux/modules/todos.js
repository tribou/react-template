// @flow
// Non-shallow reducer state example needs Immutable
// Async actions need redux-observable epics
import { fromJS, Iterable, Record } from 'immutable'


// ACTION TYPES
// export const ADD_TODO = 'my-app/todo/ADD_TODO'
// export const COMPLETE_TODO = 'my-app/todo/COMPLETE_TODO'
export const SET_FILTER = 'my-app/todo/SET_FILTER'

// CONSTANTS
export const FILTER_CURRENT = 'my-app/todo/FILTER_CURRENT'
export const FILTER_DONE = 'my-app/todo/FILTER_DONE'


// MODEL
// Profile model with default values
export const Todo = Record({
  text: '',
  date: '1970-01-01T00:00:00.000Z',
  done: false,
})


// Flow type for this reducer's state
// Always put the asterisk or it assumes 'empty'
export type TodosState = Record<*>


const fromJSTodos = (key, value) => {

  return Iterable.isIndexed(value)
    ? value.toList()
    : new Todo(value)

}

// Initial state with default values
const InitialState = Record({
  filter: FILTER_CURRENT,
  list: fromJS([
    {
      text: 'This is the first todo',
      date: '2016-12-12T20:22:54Z',
    },
    {
      text: 'This is the second todo',
    },
    {
      text: 'This is the third todo',
    },
    {
      text: 'This is todo has "double-quotes"',
    },
    {
      text: 'This one\'s done',
      done: true,
    },
  ], fromJSTodos),
})


export const initialState = new InitialState()
// Now we can retrieve city with initialState.getIn(['list', 1, 'city'])
// Or my city with initialState.getIn(['list', initialState.get('me'), 'city'])


// REDUCER
function reducer (state: TodosState = initialState, action: GlobalFSA<*>) {

  switch (action.type) {

    case SET_FILTER:
      return state.set('filter', action.payload.filter)

    default:
      return state

  }

}


// ACTION CREATORS
// Use Flux Standard Action (FSA) notation
// https://github.com/acdlite/flux-standard-action
export const setFilterDone = () => {

  return {
    type: SET_FILTER,
    payload: {
      filter: FILTER_DONE,
    },
  }

}


export const setFilterCurrent = () => {

  return {
    type: SET_FILTER,
    payload: {
      filter: FILTER_CURRENT,
    },
  }

}


// EPICS
// variable$ notation indicates an event stream
// https://redux-observable.js.org/docs/basics/Epics.html


export default reducer
