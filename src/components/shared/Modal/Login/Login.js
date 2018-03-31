// @flow
import React, { PureComponent } from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { Field } from "redux-form";
import TextField from "src/components/shared/TextField";
import css from "./Login.style.css";

import type { ReduxProps } from "./Login.index";

type Props = ReduxProps & {
  history: Object,
  handleSubmit: Function,
  submitting: boolean,
  asyncValidating: boolean
};

class Login extends PureComponent<Props> {
  // TODO: watch for resolution of
  // https://github.com/yannickcr/eslint-plugin-react/issues/1376
  props: Props;

  handleClose = () => this.props.history.goBack();

  render() {
    const { handleSubmit, submitting, asyncValidating, error } = this.props;

    return (
      <div className={css.login}>
        <Helmet title="Login" />
        <div className={css.header}>
          <button onClick={this.handleClose} className={css.icnCloseOff} />
          <div className={css.title}>LOGIN</div>
        </div>
        <form id="loginForm" className={css.loginForm} onSubmit={handleSubmit}>
          <Field
            id="usernameInput"
            name="usernameInput"
            label="Email"
            component={TextField}
            type="email"
          />
          <Field
            id="passwordInput"
            name="passwordInput"
            label="Password"
            component={TextField}
            type="password"
          />
          <Link to="/?reset-password=true">
            <div className={css.forgotPassword}>Forgot Password?</div>
          </Link>
          <div className={css.error}>{error}</div>
          <button
            className={css.submit}
            type="submit"
            disabled={submitting || asyncValidating}
          >
            {submitting || asyncValidating ? "Submitting..." : "Login"}
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
