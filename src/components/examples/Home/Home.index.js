// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { logout } from 'src/redux/modules/auth'
import type { RootReducerState } from 'src/redux/modules'
import Home from './Home'


type StateProps = {
  token: ?string,
}

const mapStateToProps = (
  { auth: { token } }: RootReducerState
): StateProps => ({ token })


type DispatchProps = {
  logout: Function,
}

const mapDispatchToProps = (dispatch: GlobalDispatch<*>): DispatchProps =>
  bindActionCreators({ logout }, dispatch)


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
export type ReduxProps = StateProps & DispatchProps
