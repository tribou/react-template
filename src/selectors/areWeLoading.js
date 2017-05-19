// @flow
import { createSelector } from 'reselect'

const getAuthFetching = (state) => {

  return state.auth.isFetching

}

const getInitLoading = (state) => {

  return state.init.isLoading

}

const getProfileFetching = (state) => {

  return state.profile.get('isFetching')

}

const getTodosFetching = (state) => {

  return state.todos.get('isFetching')

}

const getUiLoading = (state) => {

  return state.ui.showLoading

}


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
