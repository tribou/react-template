// @flow
import type { UIState } from './types'

const initialState: UIState = {
  sidebarOpen: true,
  error: null,
  // Manual option to show loading indicator if needed
  showLoading: false,
}

export default initialState
