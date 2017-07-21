// @flow
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fetchProfile } from 'src/redux/modules/examples/profile'
import type { Profile as ProfileModel } from 'src/redux/modules/examples/profile'
import type { RootReducerState } from 'src/redux/modules'
import Profile from './Profile'


type StateProps = {
  me: ProfileModel,
  error: ?string,
}

function mapStateToProps (state: RootReducerState): StateProps {

  const { profile } = state.examples

  // Let's imagine this component only needs my profile
  return {
    me: profile.data,
    error: profile.error,
  }

}


type ActionProps = {
  fetchProfile: Function,
}

const mapActionToProps: ActionProps = {
  fetchProfile,
}

export default withRouter(connect(mapStateToProps, mapActionToProps)(Profile))
export type ReduxProps = StateProps & ActionProps
