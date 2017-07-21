// @flow
// import Debug from 'debug'
import { removeAuthToken, setAuthToken } from 'src/helpers/auth'
import {
  loginMock as loginAPI,
  logoutMock as logoutAPI,
} from 'src/helpers/api/auth'

// const log = Debug('my-app:redux:modules:auth')

export const LOGIN = 'my-app/auth/LOGIN'
export const LOGOUT = 'my-app/auth/LOGOUT'

// Flow type for this reducer's initial state
export type AuthState = {
  authenticated: boolean,
  user: Object,
  error: ?string,
  isFetching: boolean,
}

// Initial state with default values
export const initialState: AuthState = {
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

    case `${LOGOUT}_PENDING`:
      return {
        ...state,
        // Optimistic
        authenticated: false,
        isFetching: true,
      }

    case `${LOGOUT}_FULFILLED`:
      return {
        ...state,
        authenticated: false,
        error: '',
        isFetching: false,
      }

    case `${LOGOUT}_REJECTED`:
      return {
        ...state,
        // Always logout!
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
type LoginParams = {
  username: string,
  password: string,
  redirect?: string,
}

export const login = (
  { username, password, redirect }: LoginParams,
  history: Object,
) =>
  (dispatch: GlobalDispatch<*>) => dispatch({
    type: LOGIN,
    payload: loginAPI({ username, password })
      .then(({ data }) => {

        setAuthToken(data.account.jwt)
        history.push({
          pathname: redirect,
        })

      }),
  })

export const logout = (history: Object, redirect: ?string) =>
  (dispatch: GlobalDispatch<*>) => {

    // Always do optimistic logout
    removeAuthToken()
    if (redirect) {

      history.push({
        pathname: redirect,
      })

    }
    else {

      history.push({
        pathname: '/',
        query: {
          login: null,
        },
      })

    }

    return dispatch({
      type: LOGOUT,
      payload: logoutAPI(),
    })

  }


export default reducer
