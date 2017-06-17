// @flow
// Non-shallow reducer state example needs Immutable
// Async actions need redux-observable epics
import { List, Record } from 'immutable'
import {
  getTodos as getTodosApi,
} from 'src/helpers/api/examples/todos'


// ACTION TYPES
// export const ADD_TODO = 'my-app/todo/ADD_TODO'
// export const COMPLETE_TODO = 'my-app/todo/COMPLETE_TODO'
export const GET_TODOS = 'my-app/todos/GET_TODOS'
export const SET_FILTER = 'my-app/todo/SET_FILTER'

// FILTERS
export const FILTER_CURRENT = 'my-app/todo/FILTER_CURRENT'
export const FILTER_DONE = 'my-app/todo/FILTER_DONE'


// MODEL
// Profile model with default values
export class Todo extends Record({ text: '', date: '', done: false }) {

  constructor ({
    text,
    date,
    done,
  }: {
    text?: string,
    date?: string,
    done?: boolean,
  }) {

    // Define defaults here
    super({
      text,
      date: date || new Date(),
      done: done || false,
    })

  }

}


const parseApiTodoList = data => {

  if (!data || data.length === 0) return List()

  return data.map(item => new Todo(item))

}

// Initial state with default values
class InitialState extends Record({ filter: FILTER_CURRENT, list: List(), isFetching: false, error: '' }) {

  constructor ({
    filter,
    list,
    isFetching,
    error,
  }: {
    filter?: string,
    list?: List<Todo>,
    isFetching?: boolean,
    error?: string,
  } = {}) {

    // Define defaults here
    super({
      filter: filter || FILTER_CURRENT,
      list: parseApiTodoList(list),
      isFetching: isFetching || false,
      error: error || '',
    })

  }

}


export const initialState = new InitialState()
// Now we can retrieve city with initialState.getIn(['list', 1, 'city'])
// Or my city with initialState.getIn(['list', initialState.get('me'), 'city'])


// REDUCER
function reducer (state: InitialState = initialState, action: GlobalFSA<*>) {

  switch (action.type) {

    case SET_FILTER:
      return state.set('filter', action.payload.filter)

    case `${GET_TODOS}_PENDING`:
      return state
        .set('isFetching', true)

    case `${GET_TODOS}_FULFILLED`:
      return state
        .set('list', parseApiTodoList(action.payload.data.data))
        .set('error', '')
        .set('isFetching', false)

    case `${GET_TODOS}_REJECTED`:
      return state
        .set('error', action.payload)
        .set('isFetching', false)

    default:
      return state

  }

}


// ACTION CREATORS
// Use redux-promise-middleware
// https://github.com/pburtchaell/redux-promise-middleware/blob/master/docs/guides/chaining-actions.md
// Which, in turn, uses Flux Standard Action (FSA) notation
// https://github.com/acdlite/flux-standard-action
export const getTodos = () => (dispatch: GlobalDispatch<*>) => dispatch({
  type: GET_TODOS,
  payload: getTodosApi(),
})


// Plain actions uses Flux Standard Action (FSA) notation
// https://github.com/acdlite/flux-standard-action
export const setFilterDone = () => ({
  type: SET_FILTER,
  payload: {
    filter: FILTER_DONE,
  },
})


export const setFilterCurrent = () => ({
  type: SET_FILTER,
  payload: {
    filter: FILTER_CURRENT,
  },
})


// EPICS
// variable$ notation indicates an event stream
// https://redux-observable.js.org/docs/basics/Epics.html


export default reducer
