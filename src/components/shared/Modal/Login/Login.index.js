// @flow
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router";
import { parse } from "qs";
import { login } from "src/redux/modules/auth";
import type { RootReducerState } from "src/redux/modules";
import Login from "./Login";

const validate = values => {
  const errors = {};
  const requiredFields = ["usernameInput", "passwordInput"];
  requiredFields.forEach(field => {
    if (!values[field]) errors[field] = "Required";
  });
  return errors;
};

const onSubmit = (values, dispatch, props): Promise<*> => {
  const { usernameInput, passwordInput } = values;
  const { history } = props;
  const search = parse(props.location.search.substr(1));

  return dispatch(
    login({
      username: usernameInput,
      password: passwordInput
    })
  ).then(() => history.push({ pathname: search.redirect }));
};

const reduxFormConfig = {
  form: "loginModalForm",
  initialValues: {
    // TODO: remove these
    usernameInput: "test@example.com",
    passwordInput: "secret"
  },
  validate,
  onSubmit
};

type StateProps = {
  error: ?string
};

const mapStateToProps = ({
  auth: { error }
}: RootReducerState): StateProps => ({ error });

export default withRouter(
  connect(mapStateToProps)(reduxForm(reduxFormConfig)(Login))
);
export type ReduxProps = StateProps;
