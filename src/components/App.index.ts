// @flow
import { connect } from 'react-redux'
import App from './App'


export interface ReduxProps {
  ROOT_URL: string;
}

function mapStateToProps (state: GlobalReducerState): ReduxProps {

  const { ROOT_URL } = state.env

  return {
    ROOT_URL,
  }

}


export default connect(mapStateToProps)(App)
