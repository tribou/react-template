// @flow
import { connect } from 'react-redux'
import type { RootReducerState } from 'src/redux/modules'
import App from './App'


type StateProps = {
  ROOT_URL: string,
}

const mapStateToProps = ({ env: { ROOT_URL } }: RootReducerState): StateProps =>
  ({ ROOT_URL })


export default connect(mapStateToProps)(App)
export type ReduxProps = StateProps
