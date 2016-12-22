// @flow
import { connect } from 'react-redux'
import Home from './Home'


type StateProps = {
  init: InitState,
}

function mapStateToProps (state: GlobalReducerState): StateProps {

  const { init } = state

  return {
    init,
  }

}


export default connect(mapStateToProps)(Home)
export type ReduxProps = StateProps
