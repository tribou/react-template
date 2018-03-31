// @flow
import { connect } from "react-redux";
import areWeLoading from "src/selectors/areWeLoading";
import type { RootReducerState } from "src/redux/modules";
import LoadingIndicator from "./LoadingIndicator";

type StateProps = {
  weAreLoading: boolean
};

const mapStateToProps = (state: RootReducerState): StateProps => ({
  weAreLoading: areWeLoading(state)
});

export default connect(mapStateToProps)(LoadingIndicator);
export type ReduxProps = StateProps;
