// @flow
// Empty reducer for now since we probably don't want to change
// it in the browser

type EnvAction = GlobalFSA<*>;

export type RequestState = {
  userAgent: string
};

export const initialState = {
  userAgent: ""
};

function reducer(
  state: Object = initialState,
  action: EnvAction
): RequestState {
  return state;
}

export default reducer;
