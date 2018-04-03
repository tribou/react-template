// @flow
import { createSelector } from "reselect";
import type { RootReducerState } from "src/redux/modules";

const getAuthFetching = (state: RootReducerState) => state.auth.isFetching;
const getInitLoading = (state: RootReducerState) => state.init.isLoading;
const getUiLoading = (state: RootReducerState) => state.ui.showLoading;

// Examples
const getProfileFetching = (state: RootReducerState) =>
  state.examples.profile.isFetching;
const getTodosFetching = (state: RootReducerState) =>
  state.examples.todos.isFetching;

const areWeLoading = createSelector(
  [
    getAuthFetching,
    getInitLoading,
    getUiLoading,
    getProfileFetching,
    getTodosFetching
  ],
  (authFetching, initLoading, uiLoading, profileFetching, todosFetching) => {
    if (
      authFetching ||
      initLoading ||
      uiLoading ||
      profileFetching ||
      todosFetching
    ) {
      return true;
    }
    // default
    return false;
  }
);

export default areWeLoading;
