// @flow
import { connect } from 'react-redux'
import areWeLoading from 'src/selectors/areWeLoading'
import LoadingIndicator from './LoadingIndicator'


type StateProps = {
  weAreLoading: boolean,
}

function mapStateToProps (state: GlobalReducerState): StateProps {

  return {
    weAreLoading: areWeLoading(state),
  }

}


export default connect(mapStateToProps)(LoadingIndicator)
export type ReduxProps = StateProps
