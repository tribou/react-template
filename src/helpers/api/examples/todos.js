// @flow
import { get, mock } from 'src/helpers/api'
import env from 'config/env'

const { API_URL, USE_MOCK_API } = env

export const getTodosMock = () => {

  return mock({
    data: [
      {
        text: 'This is the first todo',
        date: '2016-12-12T20:22:54Z',
      },
      {
        text: 'This is the second todo',
      },
      {
        text: 'This is the third todo',
      },
      {
        text: 'This is todo has "double-quotes"',
      },
      {
        text: 'This one\'s done',
        done: true,
      },
    ],
  })

}

export const getTodos = () => {

  return USE_MOCK_API
    ? getTodosMock()
    : get(`${API_URL}/todos`)

}
