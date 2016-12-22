// @flow
import type { List } from 'immutable'
import { connect } from 'react-redux'
import Todos from './Todos'
import { setFilterCurrent, setFilterDone } from '../../../redux/modules/todos'
import visibleTodos from '../../../selectors/visibleTodos'


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


type ActionProps = {
  setFilterCurrent: Function,
  setFilterDone: Function,
}

export default connect(mapStateToProps, {
  setFilterCurrent,
  setFilterDone,
})(Todos)

export type ReduxProps = StateProps & ActionProps
