// @flow
//
// Example nested reducer
import { combineReducers } from "redux";
import profile from "./profile";
import todos from "./todos";

import type { ProfileState } from "./profile";
import type { TodosState } from "./todos";

export type ExamplesState = {
  profile: ProfileState,
  todos: TodosState
};

const examples = combineReducers({
  profile,
  todos
});

export default examples;
