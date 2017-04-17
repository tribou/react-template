// @flow
import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
import { Field } from 'redux-form'
import history from 'src/helpers/history'
import css from './Login.style.css'

import type { ReduxProps } from './Login.index'


type Props = ReduxProps & {
  handleSubmit: Function,
  location: Object,
  submitting: boolean,
  asyncValidating: boolean,
}

const handleClose = () => {

  history.goBack()

}

const Login = (props: Props): React$Element<any> => {

  const {
    handleSubmit,
    submitting,
    asyncValidating,
    error,
  } = props

  return (
    <div className={css.login}>
      <Helmet title="Login" />
      <div className={css.header}>
        <button
          onClick={handleClose}
          className={css.icnCloseOff}
        />
        <div className={css.title}>LOGIN</div>
      </div>
      <form
        id="loginForm"
        className={css.loginForm}
        onSubmit={handleSubmit}
      >
        <Field
          name="usernameInput"
          label="Email"
          placeholder="Email"
          component="input"
          type="email"
        />
        <Field
          name="passwordInput"
          label="Password"
          placeholder="Password"
          component="input"
          type="password"
        />
        <Link to="/?reset-password">
          <div className={css.forgotPassword}>
            Forgot Password?
          </div>
        </Link>
        <div className={css.error}>
          {error}
        </div>
        <button
          className={css.submit}
          type="submit"
          disabled={submitting || asyncValidating}
        >
          {(submitting || asyncValidating) ? 'Submitting...' : 'Login'}
        </button>
      </form>
    </div>
  )


}


export default Login
