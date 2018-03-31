// @flow
// import Debug from 'debug'
import get from "lodash/get";
import { removeAuthToken, setAuthToken } from "src/helpers/auth";
import {
  loginMock as loginAPI,
  logoutMock as logoutAPI
} from "src/helpers/api/auth";

// const log = Debug('my-app:redux:modules:auth')

export const LOGIN = "my-app/auth/LOGIN";
export const LOGOUT = "my-app/auth/LOGOUT";

// Flow type for this reducer's initial state
export type AuthState = {
  token: ?string,
  user: Object,
  error: ?string,
  isFetching: boolean
};

// Initial state with default values
export const initialState: AuthState = {
  token: "",
  user: {},
  error: "",
  isFetching: false
};

// REDUCER
function reducer(state: AuthState = initialState, action: GlobalFSA<*>) {
  switch (action.type) {
    case `${LOGIN}_PENDING`:
      return {
        ...state,
        isFetching: true
      };

    case `${LOGIN}_FULFILLED`:
      return {
        ...state,
        token: get(action, "payload.data.account.jwt"),
        error: "",
        isFetching: false
      };

    case `${LOGIN}_REJECTED`:
      return {
        ...state,
        token: "",
        error: action.payload,
        isFetching: false
      };

    case `${LOGOUT}_PENDING`:
      return {
        ...state,
        // Optimistic
        token: "",
        isFetching: true
      };

    case `${LOGOUT}_FULFILLED`:
      return {
        ...state,
        token: "",
        error: "",
        isFetching: false
      };

    case `${LOGOUT}_REJECTED`:
      return {
        ...state,
        // Always logout!
        token: "",
        error: action.payload,
        isFetching: false
      };

    default:
      return state;
  }
}

// ACTION CREATORS
// Use redux-promise-middleware
// https://github.com/pburtchaell/redux-promise-middleware/blob/master/docs/guides/chaining-actions.md
// Which, in turn, uses Flux Standard Action (FSA) notation
// https://github.com/acdlite/flux-standard-action
type LoginParams = {
  username: string,
  password: string
};

export const login = ({
  username,
  password
}: LoginParams): GlobalThunkAction => (dispatch: GlobalDispatch<*>) =>
  dispatch({
    type: LOGIN,
    payload: loginAPI({ username, password }).then(response =>
      setAuthToken(response.data.account.jwt).then(() => response)
    )
  });

export const logout = (
  history: Object,
  redirect: ?string
): GlobalThunkAction => (dispatch: GlobalDispatch<*>) => {
  // Always do optimistic logout
  removeAuthToken();
  redirect
    ? history.push({
        pathname: redirect
      })
    : history.push({
        pathname: "/",
        query: {
          login: null
        }
      });

  return dispatch({
    type: LOGOUT,
    payload: logoutAPI()
  });
};

export default reducer;
