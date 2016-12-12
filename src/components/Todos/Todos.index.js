// @flow
import type { List } from 'immutable'
import { connect } from 'react-redux'
import Profile from './Todos'
import { setFilterCurrent, setFilterDone } from '../../redux/modules/todos'


type StateProps = {
  // Always put the asterisk or it assumes 'empty'
  todos: List<*>,
  filter: string,
}

function mapStateToProps (state: GlobalReducerState): StateProps {

  const { todos } = state

  return {
    todos: todos.get('list'),
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
})(Profile)

export type ReduxProps = StateProps & ActionProps
