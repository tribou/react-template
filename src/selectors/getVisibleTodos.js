// @flow
import { createSelector } from 'reselect'
import { FILTER_CURRENT, FILTER_DONE } from 'src/redux/modules/examples/todos'
import type { RootReducerState } from 'src/redux/modules'


const getTodos = (state: RootReducerState) => state.examples.todos.list
const getFilter = (state: RootReducerState) => state.examples.todos.filter


const getVisibleTodos = createSelector(
  [getTodos, getFilter],
  (todos, filter) => {

    switch (filter) {

      case FILTER_CURRENT:
        return todos.filter(todo => todo.done === false)

      case FILTER_DONE:
        return todos.filter(todo => todo.done === true)

      default:
        return todos

    }

  }
)


export default getVisibleTodos
