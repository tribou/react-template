// @flow
import { get } from '../'
import env from '../../../../config/env'

const { API_URL } = env

export const getTodos = () => {

  return get(`${API_URL}/todos`)

}


export const getTodosMock = () => {

  return new Promise((resolve, reject) => {

    setTimeout(() => {

      return resolve([
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
      ])

    }, 1000)

  })

}
