// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  getTodos,
  setFilterCurrent,
  setFilterDone,
} from 'src/redux/modules/examples/todos'
import getVisibleTodos from 'src/selectors/getVisibleTodos'
import type { Todo } from 'src/redux/modules/examples/todos'
import type { RootReducerState } from 'src/redux/modules'
import Todos from './Todos'


type StateProps = {
  // Always put the asterisk or it assumes 'empty'
  todos: Array<Todo>,
  filter: string,
}

function mapStateToProps (state: RootReducerState): StateProps {

  const { todos } = state.examples

  return {
    todos: getVisibleTodos(state),
    filter: todos.filter,
  }

}


type DispatchProps = {
  setFilterCurrent: Function,
  setFilterDone: Function,
  getTodos: Function,
}

function mapDispatchToProps (dispatch: any): DispatchProps {

  return {
    setFilterCurrent: bindActionCreators(setFilterCurrent, dispatch),
    setFilterDone: bindActionCreators(setFilterDone, dispatch),
    getTodos: bindActionCreators(getTodos, dispatch),
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Todos)
export type ReduxProps = StateProps & DispatchProps
