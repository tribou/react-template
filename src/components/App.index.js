// @flow
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import type { RootReducerState } from 'src/redux/modules'
import App from './App'


type StateProps = {
  ROOT_URL: string,
}

const mapStateToProps = ({ env: { ROOT_URL } }: RootReducerState): StateProps =>
  ({ ROOT_URL })


export default withRouter(connect(mapStateToProps)(App))
export type ReduxProps = StateProps
