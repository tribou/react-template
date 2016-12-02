// @flow
import { connect } from 'react-redux'
import Home from './Home'


type HomeStateProps = {
  init: InitState,
}


function mapStateToProps (state: GlobalReducerState): HomeStateProps {

  const { init } = state

  return {
    init,
  }

}


export default connect(mapStateToProps)(Home)
