// @flow
import { connect } from "react-redux";
import { withRouter } from "react-router";
import type { RootReducerState } from "src/redux/modules";
import RequireAuth from "./RequireAuth";

type StateProps = {
  token: ?string
};

const mapStateToProps = ({
  auth: { token }
}: RootReducerState): StateProps => ({ token });

export default withRouter(connect(mapStateToProps)(RequireAuth));
export type ReduxProps = StateProps;
