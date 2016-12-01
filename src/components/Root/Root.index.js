// @flow
import { connect } from 'react-redux'
import Root from './Root'


type RootStateProps = {
  init: InitState,
}


function mapStateToProps (state: GlobalReducerState): RootStateProps {

  const { init } = state

  return {
    init,
  }

}


export default connect(mapStateToProps)(Root)
