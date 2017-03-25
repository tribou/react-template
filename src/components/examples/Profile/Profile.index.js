// @flow
import { connect } from 'react-redux'
import { fetchProfile } from 'src/redux/modules/profile'
import Profile from './Profile'


type StateProps = {
  me: Map<>,
  error: string,
}

function mapStateToProps (state: GlobalReducerState): StateProps {

  const { profile } = state

  // Let's imagine this component only needs my profile
  return {
    me: profile.get('me'),
    error: profile.get('error'),
  }

}


type ActionProps = {
  fetchProfile: Function,
}

const mapActionToProps: ActionProps = {
  fetchProfile,
}

export default connect(mapStateToProps, mapActionToProps)(Profile)
export type ReduxProps = StateProps & ActionProps
