// @flow
import { connect } from 'react-redux'
import Root from './Root'


function mapStateToProps (state: GlobalReducerState): Object {

  const { init } = state

  return {
    init,
  }

}


export default connect(mapStateToProps)(Root)
