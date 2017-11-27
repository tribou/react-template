// @flow
// Todos model with default values
export type Todo = {
  text: string,
  date: string,
  done: boolean,
}

export type TodosState = {
  +filter: string,
  +list: Array<Todo>,
  +isFetching: boolean,
  +error: ?string,
}
