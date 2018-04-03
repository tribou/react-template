// @flow
// Non-shallow reducer state example needs Immutable
// Async actions need redux-observable epics
import { getTodosMock as getTodosApi } from "src/helpers/api/examples/todos";

// ACTION TYPES
// export const ADD_TODO = 'my-app/todo/ADD_TODO'
// export const COMPLETE_TODO = 'my-app/todo/COMPLETE_TODO'
export const GET_TODOS = "my-app/examples/todos/GET_TODOS";
export const SET_FILTER = "my-app/examples/todos/SET_FILTER";

// FILTERS
export const FILTER_CURRENT = "my-app/examples/todos/FILTER_CURRENT";
export const FILTER_DONE = "my-app/examples/todos/FILTER_DONE";

// MODEL
// Todos model with default values
export type Todo = {
  text: string,
  date: string,
  done: boolean
};

export type TodosState = {
  +filter: string,
  +list: Array<Todo>,
  +isFetching: boolean,
  +error: ?string
};

export const initialState: TodosState = {
  filter: FILTER_CURRENT,
  list: [],
  isFetching: false,
  error: ""
};

// REDUCER
function reducer(state: TodosState = initialState, action: GlobalFSA<*>) {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload.filter
      };

    case `${GET_TODOS}_PENDING`:
      return {
        ...state,
        isFetching: true
      };

    case `${GET_TODOS}_FULFILLED`:
      return {
        ...state,
        list: action.payload.data.data,
        isFetching: false,
        error: initialState.error
      };

    case `${GET_TODOS}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };

    default:
      return state;
  }
}

// ACTION CREATORS
// Use redux-promise-middleware
// https://github.com/pburtchaell/redux-promise-middleware/blob/master/docs/guides/chaining-actions.md
// Which, in turn, uses Flux Standard Action (FSA) notation
// https://github.com/acdlite/flux-standard-action
export const getTodos = () => ({
  type: GET_TODOS,
  payload: getTodosApi()
});

// Plain actions uses Flux Standard Action (FSA) notation
// https://github.com/acdlite/flux-standard-action
export const setFilterDone = () => ({
  type: SET_FILTER,
  payload: {
    filter: FILTER_DONE
  }
});

export const setFilterCurrent = () => ({
  type: SET_FILTER,
  payload: {
    filter: FILTER_CURRENT
  }
});

// EPICS
// variable$ notation indicates an event stream
// https://redux-observable.js.org/docs/basics/Epics.html

export default reducer;
