// @flow
import { connect } from "react-redux";
import type { RootReducerState } from "src/redux/modules";
import Template from "./Template";

/**
 * OwnProps are injected by react router.
 */
// type OwnProps = {
//   route: Route,
//   match: Match<{ productionId: string }>
// };

/**
 * StateProps provide a read-only view of the state.
 */
type StateProps = {
  url: string
};

const mapStateToProps = ({
  env: { ROOT_URL }
}: RootReducerState): StateProps => ({ url: ROOT_URL });

/**
 * DispatchProps inject actions to mutate the state.
 */
type DispatchProps = {};

const mapDispatchToProps = (dispatch: GlobalDispatch<*>): DispatchProps => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Template);
export type ReduxProps = StateProps & DispatchProps;
