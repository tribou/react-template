// @flow
import React from 'react'
import { Link } from 'react-router'
import { Field } from 'redux-form'
import css from './Login.style.css'

import type { ReduxProps } from './Login.index'


type Props = ReduxProps & {
  handleSubmit: Function,
  location: Object,
  submitting: boolean,
  asyncValidating: boolean,
}

const Login = (props: Props): React$Element<any> => {

  const {
    handleSubmit,
    location,
    submitting,
    asyncValidating,
    error,
  } = props
  const { pathname } = location

  return (
    <div className={css.login}>
      <div className={css.header}>
        <Link
          className={css.icnCloseOffLink}
          to={{
            pathname,
            state: { modal: '' },
          }}
        >
          <button className={css.icnCloseOff} />
        </Link>
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
