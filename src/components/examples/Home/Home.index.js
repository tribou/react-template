// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { logout } from 'src/redux/modules/auth'
import Home from './Home'


type StateProps = {
  authenticated: boolean,
}

function mapStateToProps (state: GlobalReducerState): StateProps {

  const { authenticated } = state.auth

  return {
    authenticated,
  }

}


type DispatchProps = {
  logout: Function,
}

function mapDispatchToProps (dispatch: any): DispatchProps {

  return {
    logout: bindActionCreators(logout, dispatch),
  }

}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
export type ReduxProps = StateProps & DispatchProps
