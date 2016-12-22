// @flow
import { connect } from 'react-redux'
import Profile from './Profile'
import { fetchProfile } from '../../../redux/modules/profile'


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

export default connect(mapStateToProps, { fetchProfile })(Profile)
export type ReduxProps = StateProps & ActionProps
