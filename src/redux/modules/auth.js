// @flow
import { setAuthToken } from 'src/helpers/auth'
import {
  loginMock as loginApi,
} from 'src/helpers/api/auth'
import history from 'src/helpers/history'

export const LOGIN = 'my-app/auth/LOGIN'

// Flow type for this reducer's initial state
export type AuthState = {
  authenticated: boolean,
  user: Object,
  error: ?string,
  isFetching: boolean,
}

// Initial state with default values
export const initialState = {
  authenticated: false,
  user: {},
  error: '',
  isFetching: false,
}


// REDUCER
function reducer (state: AuthState = initialState, action: GlobalFSA<*>) {

  switch (action.type) {

    case `${LOGIN}_PENDING`:
      return {
        ...state,
        isFetching: true,
      }

    case `${LOGIN}_FULFILLED`:
      return {
        ...state,
        authenticated: true,
        error: '',
        isFetching: false,
      }

    case `${LOGIN}_REJECTED`:
      return {
        ...state,
        authenticated: false,
        error: action.payload,
        isFetching: false,
      }

    default:
      return state

  }

}


// ACTION CREATORS
// Use redux-promise-middleware
// https://github.com/pburtchaell/redux-promise-middleware/blob/master/docs/guides/chaining-actions.md
// Which, in turn, uses Flux Standard Action (FSA) notation
// https://github.com/acdlite/flux-standard-action

export const login = (
  username: string, password: string, redirect?: string,
) => {

  return (dispatch: any) => {

    return dispatch({
      type: LOGIN,
      payload: loginApi({ username, password })
        .then((data) => {

          setAuthToken(data.account.jwt)
          history.push({
            pathname: redirect,
          })

        }),
    })

  }

}


export default reducer
