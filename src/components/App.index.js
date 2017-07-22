// @flow
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import type { RootReducerState } from 'src/redux/modules'
import App from './App'


type StateProps = {
  ROOT_URL: string,
}

function mapStateToProps (state: RootReducerState): StateProps {

  const { ROOT_URL } = state.env

  return {
    ROOT_URL,
  }

}


export default withRouter(connect(mapStateToProps)(App))
export type ReduxProps = StateProps
