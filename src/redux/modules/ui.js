// @flow
import { DISPLAY_ERROR } from "src/redux/middleware/errorDisplay";
// import Debug from 'debug'
// const log = Debug('my-app:redux:modules:ui')

// ACTION TYPES
export const CLOSE_SIDEBAR = "my-app/ui/CLOSE_SIDEBAR";
export const OPEN_SIDEBAR = "my-app/ui/OPEN_SIDEBAR";

export const START_LOADING = "my-app/ui/START_LOADING";
export const STOP_LOADING = "my-app/ui/STOP_LOADING";

// MODEL
export type UIState = {
  sidebarOpen: boolean,
  error: ?{ message: string },
  showLoading: boolean
};

export const initialState: UIState = {
  sidebarOpen: true,
  error: null,
  // Manual option to show loading indicator if needed
  showLoading: false
};

// REDUCER
function reducer(state: UIState = initialState, action: GlobalFSA<*>) {
  switch (action.type) {
    case DISPLAY_ERROR:
      return {
        ...state,
        error: action.payload
      };

    case CLOSE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: false
      };

    case OPEN_SIDEBAR:
      return {
        ...state,
        sidebarOpen: true
      };

    case START_LOADING:
      return {
        ...state,
        showLoading: true
      };

    case STOP_LOADING:
      return {
        ...state,
        showLoading: false
      };

    default:
      return state;
  }
}

// ACTION CREATORS
// Use Flux Standard Action (FSA) notation
// https://github.com/acdlite/flux-standard-action
export const startLoading = () => ({
  type: START_LOADING
});

export const stopLoading = () => ({
  type: STOP_LOADING
});

export default reducer;
