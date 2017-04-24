// @flow
import { connect } from 'react-redux'
import areWeLoading from 'src/selectors/areWeLoading'
import LoadingIndicator from './LoadingIndicator'


export interface IReduxProps {
  weAreLoading: boolean;
}

function mapStateToProps (state: IReducerState): IReduxProps {

  return {
    weAreLoading: areWeLoading(state),
  }

}


export default connect(mapStateToProps)(LoadingIndicator)
