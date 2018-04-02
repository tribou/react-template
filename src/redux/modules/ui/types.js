// @flow
export type ErrorMessage = { message: string }

export type UIState = {
  sidebarOpen: boolean,
  error: ?ErrorMessage,
  showLoading: boolean,
}
