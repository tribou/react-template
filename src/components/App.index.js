// @flow
import { connect } from 'react-redux'
import App from './App'


type AppStateProps = {
  env: EnvState,
}


function mapStateToProps (state: GlobalReducerState): AppStateProps {

  const { env } = state

  return {
    env,
  }

}


export default connect(mapStateToProps)(App)
