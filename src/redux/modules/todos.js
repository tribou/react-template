// @flow
// Non-shallow reducer state example needs Immutable
// Async actions need redux-observable epics
import { List, Record } from 'immutable'
import {
  getTodosMock as getTodosApi,
} from '../../helpers/api/examples/todos'


// ACTION TYPES
// export const ADD_TODO = 'my-app/todo/ADD_TODO'
// export const COMPLETE_TODO = 'my-app/todo/COMPLETE_TODO'
export const GET_TODOS = 'my-app/todos/GET_TODOS'
export const SET_FILTER = 'my-app/todo/SET_FILTER'

// FILTERS
export const FILTER_CURRENT = 'my-app/todo/FILTER_CURRENT'
export const FILTER_DONE = 'my-app/todo/FILTER_DONE'


// Flow type for this reducer's state
// Always put the asterisk or it assumes 'empty'
export type TodosState = Record<*>

// MODEL
// Profile model with default values
export class Todo extends Record({ text: '', date: '', done: false }) {

  constructor ({
    text,
    date,
    done,
  }: { text?: string, date?: string, done?: boolean }) {

    super({
      text,
      date: date || new Date(),
      done: done || false,
    })

  }

}

// Initial state with default values
class InitialState extends Record({
  filter: FILTER_CURRENT,
  list: List(),
  isFetching: false,
  error: '',
}) {

  constructor ({
    filter,
    list,
    isFetching,
    error,
  }: {
    filter?: string,
    list?: Array<*>,
    isFetching?: boolean,
    error?: string,
  } = {}) {

    super({
      filter,
      list,
      isFetching,
      error,
    })

  }

}


const parseApiTodoList = (data) => {

  if (!data || data.length === 0) return List()

  return data.map((item) => {

    return new Todo(item)

  })

}


export const initialState = new InitialState()
// Now we can retrieve city with initialState.getIn(['list', 1, 'city'])
// Or my city with initialState.getIn(['list', initialState.get('me'), 'city'])


// REDUCER
function reducer (state: TodosState = initialState, action: GlobalFSA<*>) {

  switch (action.type) {

    case SET_FILTER:
      return state.set('filter', action.payload.filter)

    case `${GET_TODOS}_PENDING`:
      return state
        .set('isFetching', true)

    case `${GET_TODOS}_FULFILLED`:
      return state
        .set('list', parseApiTodoList(action.payload))
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
export const getTodos = () => {

  return (dispatch: any) => {

    return dispatch({
      type: GET_TODOS,
      payload: getTodosApi(),
    })

  }

}


// Plain actions uses Flux Standard Action (FSA) notation
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
