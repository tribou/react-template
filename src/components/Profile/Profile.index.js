// @flow
import { connect } from 'react-redux'
import Profile from './Profile'


type StateProps = {
  me: Map<>,
}

export type ReduxProps = StateProps


function mapStateToProps (state: GlobalReducerState): StateProps {

  const { profile } = state

  // Let's imagine this component only needs my profile
  return {
    me: profile.getIn(['list', profile.get('me')]),
  }

}


export default connect(mapStateToProps)(Profile)
