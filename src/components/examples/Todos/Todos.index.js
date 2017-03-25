// @flow
import type { List } from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  getTodos,
  setFilterCurrent,
  setFilterDone,
} from 'src/redux/modules/todos'
import visibleTodos from 'src/selectors/visibleTodos'
import Todos from './Todos'


type StateProps = {
  // Always put the asterisk or it assumes 'empty'
  todos: List<*>,
  filter: string,
}

function mapStateToProps (state: GlobalReducerState): StateProps {

  const { todos } = state

  return {
    todos: visibleTodos(state),
    filter: todos.get('filter'),
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
