// @flow
//
// Example of how to apply react-router types
// import { withRouter, type ContextRouter } from "react-router";
// import { connect } from "react-redux";
// import { type RootReducerState } from "src/redux/modules";
import Template from "./Template";

/**
 * OwnProps are injected by react router.
 */
type OwnProps = {
  // ...ContextRouter
};

/**
 * StateProps provide a read-only view of the state.
 */
type StateProps = {};

// const mapStateToProps = (state: RootReducerState): StateProps => ({});

/**
 * DispatchProps inject actions to mutate the state.
 */
type DispatchProps = {};

// const mapDispatchToProps = (dispatch: GlobalDispatch<*>): DispatchProps => ({});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(Template);
export default Template;
export type ContainerProps = StateProps & DispatchProps & OwnProps;
