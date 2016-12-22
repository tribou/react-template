// @flow
import { connect } from 'react-redux'
import App from './App'


type StateProps = {
  ROOT_URL: string,
}

function mapStateToProps (state: GlobalReducerState): StateProps {

  const { ROOT_URL } = state.env

  return {
    ROOT_URL,
  }

}


export default connect(mapStateToProps)(App)
export type ReduxProps = StateProps
