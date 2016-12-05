// @flow
import { connect } from 'react-redux'
import App from './App'


type StateProps = {
  env: EnvState,
}

export type ReduxProps = StateProps


function mapStateToProps (state: GlobalReducerState): StateProps {

  const { env } = state

  return {
    env,
  }

}


export default connect(mapStateToProps)(App)
