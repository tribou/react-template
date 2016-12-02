// @flow
import { connect } from 'react-redux'
import Profile from './Profile'


type ProfileStateProps = {
}


function mapStateToProps (state: GlobalReducerState): ProfileStateProps {

  const { init } = state

  return {
    init,
  }

}


export default connect(mapStateToProps)(Profile)
