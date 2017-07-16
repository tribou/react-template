// @flow
import { createSelector } from 'reselect'
import type { RootReducerState } from 'src/redux/modules'

const getAuthFetching = (state: RootReducerState) => state.auth.isFetching
const getInitLoading = (state: RootReducerState) => state.init.isLoading
const getProfileFetching = (state: RootReducerState) => state.profile.isFetching
const getTodosFetching = (state: RootReducerState) => state.todos.isFetching
const getUiLoading = (state: RootReducerState) => state.ui.showLoading


const areWeLoading = createSelector([
  getAuthFetching,
  getInitLoading,
  getProfileFetching,
  getTodosFetching,
  getUiLoading,
], (
  authFetching,
  initLoading,
  profileFetching,
  todosFetching,
  uiLoading,
) => {

  if (
    authFetching
    || initLoading
    || profileFetching
    || todosFetching
    || uiLoading
  ) {

    return true

  }
  // default
  return false

})


export default areWeLoading
