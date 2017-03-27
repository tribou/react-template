// @flow
import { post } from 'src/helpers/api'
import env from 'config/env'

const { API_URL } = env


type LoginParams = {
  username: string,
  password: string,
}

export const login = ({ username, password }: LoginParams) => {

  return post(`${API_URL}/auth/login`, { username, password }, {
    // Override and don't send auth header for login
    headers: {
      Authorization: undefined,
    },
  })

}

export const loginMock = ({ username, password }: LoginParams) => {

  return new Promise((resolve, reject) => {

    setTimeout(() => {

      return resolve({
        account: {
          id: '1',
          email: 'email@example.com',
          jwt: 'tokenabc123',
        },
      })

    }, 500)

  })

}


export const logout = () => {

  return post(`${API_URL}/auth/logout`)

}

export const logoutMock = () => {

  return new Promise((resolve, reject) => {

    setTimeout(() => {

      return resolve({})

    }, 500)

  })

}
