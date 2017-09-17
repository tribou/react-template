// @flow
import { connect } from 'react-redux'
import type { RootReducerState } from 'src/redux/modules'
import ErrorMessage from './ErrorMessage'


type StateProps = {
  error: ?{ message: string },
}

const mapStateToProps = ({ ui: { error } }: RootReducerState): StateProps => ({
  error,
})


export default connect(mapStateToProps)(ErrorMessage)
export type ReduxProps = StateProps
