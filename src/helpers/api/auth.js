// @flow
import { post, mock } from 'src/helpers/api'
import env from 'config/env'

const { API_URL, USE_MOCK_API } = env

type LoginParams = {
  username: string,
  password: string,
}

export const loginMock = ({ username, password }: LoginParams) => {

  return mock({
    account: {
      id: '1',
      email: 'email@example.com',
      jwt: 'tokenabc123',
    },
  })

}

export const login = ({ username, password }: LoginParams) => {

  return USE_MOCK_API
    ? loginMock({ username, password })
    : post(`${API_URL}/auth/login`, { username, password }, {
      // Override and don't send auth header for login
      headers: {
        Authorization: undefined,
      },
    })

}

export const logoutMock = () => {

  return mock({})

}

export const logout = () => {

  return USE_MOCK_API
    ? logoutMock()
    : post(`${API_URL}/auth/logout`)

}
