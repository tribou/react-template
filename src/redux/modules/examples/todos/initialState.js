// @flow
import { FILTER_CURRENT } from './consts'
import type { TodosState } from './types'

const initialState: TodosState = {
  filter: FILTER_CURRENT,
  list: [],
  isFetching: false,
  error: '',
}

export default initialState
