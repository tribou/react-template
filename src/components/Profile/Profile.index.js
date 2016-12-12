// @flow
import { connect } from 'react-redux'
import Profile from './Profile'
import { fetchProfile } from '../../redux/modules/profile'


type StateProps = {
  API_URL: string,
  me: Map<>,
}

function mapStateToProps (state: GlobalReducerState): StateProps {

  const { env, profile } = state
  const { API_URL } = env

  // Let's imagine this component only needs my profile
  return {
    API_URL,
    me: profile.get('me'),
  }

}


type ActionProps = {
  fetchProfile: Function,
}

export default connect(mapStateToProps, { fetchProfile })(Profile)
export type ReduxProps = StateProps & ActionProps
