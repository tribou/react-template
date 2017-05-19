// @flow
import { connect } from 'react-redux'
import ErrorMessage from './ErrorMessage'


type StateProps = {
  error: ?{ message: string },
}

function mapStateToProps (state: GlobalReducerState): StateProps {

  return {
    error: state.ui.error,
  }

}


export default connect(mapStateToProps)(ErrorMessage)
export type ReduxProps = StateProps
