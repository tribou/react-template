// @flow
import { removeAuthToken, setAuthToken } from 'src/helpers/auth'
import { loginMock as loginAPI, logoutMock as logoutAPI } from './api'
import type { LoginParams } from './types'
import { LOGIN, LOGOUT } from './consts'

// ACTION CREATORS
// Use redux-promise-middleware
// https://github.com/pburtchaell/redux-promise-middleware/blob/master/docs/guides/chaining-actions.md
// Which, in turn, uses Flux Standard Action (FSA) notation
// https://github.com/acdlite/flux-standard-action

export const login = (
  { username, password }: LoginParams,
): GlobalThunkAction =>
  (dispatch: GlobalDispatch<*>) => dispatch({
    type: LOGIN,
    payload: loginAPI({ username, password })
      .then(response => setAuthToken(response.data.account.jwt)
        .then(() => response)
      ),
  })

export const logout = (history: Object, redirect: ?string): GlobalThunkAction =>
  (dispatch: GlobalDispatch<*>) => {

    // Always do optimistic logout
    removeAuthToken()
    redirect
      ? history.push({ pathname: redirect })
      : history.push({ pathname: '/', query: { login: null } })

    return dispatch({ type: LOGOUT, payload: logoutAPI() })

  }
