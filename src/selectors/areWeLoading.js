// @flow
import { createSelector } from 'reselect'

const getAuthFetching = state => state.auth.isFetching

const getInitLoading = state => state.init.isLoading

const getProfileFetching = state => state.profile.get('isFetching')

const getTodosFetching = state => state.todos.get('isFetching')

const getUiLoading = state => state.ui.showLoading


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
