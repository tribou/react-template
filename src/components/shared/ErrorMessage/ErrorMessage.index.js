// @flow
import { connect } from 'react-redux'
import type { RootReducerState } from 'src/redux/modules'
import ErrorMessage from './ErrorMessage'


type StateProps = {
  error: ?{ message: string },
}

function mapStateToProps (state: RootReducerState): StateProps {

  return {
    error: state.ui.error,
  }

}


export default connect(mapStateToProps)(ErrorMessage)
export type ReduxProps = StateProps
