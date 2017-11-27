// @flow
import { get, mock } from 'src/helpers/api'
import env from 'config/env'
import { todoList as todoListMock } from './mocks'

const { API_URL, USE_MOCK_API } = env

export const getTodosMock = () => mock(todoListMock)

export const getTodos = () => (
  USE_MOCK_API
    ? getTodosMock()
    : get(`${API_URL}/todos`)
)
