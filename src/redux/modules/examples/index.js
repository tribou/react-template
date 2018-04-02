// @flow

// Example nested reducer
import { combineReducers } from 'redux'
import profile from './profile/reducer'
import todos from './todos/reducer'

import type { ProfileState } from './profile/types'
import type { TodosState } from './todos/types'

export type ExamplesState = {
  profile: ProfileState,
  todos: TodosState,
}

const examples = combineReducers({
  profile,
  todos,
})

export default examples
