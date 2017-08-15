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

const mapStateToProps = (
  { examples: { profile } }: RootReducerState
): StateProps => ({
  me: profile.data,
  error: profile.error,
})


type DispatchProps = {
  fetchProfile: Function,
}

const mapDispatchToProps: DispatchProps = {
  fetchProfile,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
export type ReduxProps = StateProps & DispatchProps
