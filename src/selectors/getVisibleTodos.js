// @flow
import { createSelector } from 'reselect'
import { FILTER_CURRENT, FILTER_DONE } from 'src/redux/modules/todos'


const getTodos = state => state.todos.get('list')

const getFilter = state => state.todos.get('filter')


const getVisibleTodos = createSelector(
  [getTodos, getFilter],
  (todos, filter) => {

    switch (filter) {

      case FILTER_CURRENT:
        return todos.filter(todo => todo.get('done') === false)

      case FILTER_DONE:
        return todos.filter(todo => todo.get('done') === true)

      default:
        return todos

    }

  }
)


export default getVisibleTodos
