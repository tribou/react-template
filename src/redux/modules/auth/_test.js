// @flow
import userMock from './mocks'
import reducer from './reducer'
import initialState from './initialState'
import { LOGIN, LOGOUT } from './consts'

describe('Auth Initial and Prev State', () => {

  const unknownAction = {
    type: 'SOME_UNKNOWN_ACTION',
    payload: {},
  }

  it('uses initial state when no prev state is given', () => {

    const prevState = undefined
    const nextState = reducer(prevState, unknownAction)
    expect(nextState).toEqual(initialState)

  })

  it('returns prev state by default for unknown action', () => {

    const prevState = initialState
    const nextState = reducer(prevState, unknownAction)
    expect(nextState).toEqual(initialState)

  })

})

describe('User login', () => {

  const prevState = initialState

  it('returns isFetching while fetching', () => {

    const expectedState = { ...prevState, isFetching: true }
    const action = { type: `${LOGIN}_PENDING`, payload: [] }
    const nextState = reducer(prevState, action)
    expect(nextState).toEqual(expectedState)

  })

  it('returns user token, no isFetching and no error on fetch success', () => {

    const expectedState = {
      ...prevState,
      token: userMock.account.jwt,
      isFetching: false,
      error: '',
    }
    const action = {
      type: `${LOGIN}_FULFILLED`,
      payload: { data: userMock },
    }
    const nextState = reducer(prevState, action)
    expect(nextState).toEqual(expectedState)

  })

  it('returns no user token, no isFetching and error description on fetch failure', () => {

    const expectedState = {
      ...prevState,
      token: '',
      isFetching: false,
      error: 'Network Error',
    }
    const action = {
      type: `${LOGIN}_REJECTED`,
      payload: 'Network Error',
    }
    const nextState = reducer(prevState, action)
    expect(nextState).toEqual(expectedState)

  })

})

describe('User logout', () => {

  const prevState = {
    ...initialState,
    token: userMock.account.jwt,
  }

  it('returns isFetching and no token (optimistic) on loggin out', () => {

    const expectedState = { ...prevState, token: '', isFetching: true }
    const action = { type: `${LOGOUT}_PENDING`, payload: {} }
    const nextState = reducer(prevState, action)
    expect(nextState).toEqual(expectedState)

  })

  it('resets state to initialState on LOGOUT success', () => {

    const expectedState = initialState

    const action = {
      type: `${LOGOUT}_FULFILLED`,
      payload: initialState,
    }
    const nextState = reducer(prevState, action)
    expect(nextState).toEqual(expectedState)

  })

  it('returns isFetching false, error description and no token (always logout) on logout failure', () => {

    const expectedState = {
      ...prevState,
      token: '',
      isFetching: false,
      error: 'Network Error',
    }
    const action = {
      type: `${LOGOUT}_REJECTED`,
      payload: 'Network Error',
    }
    const nextState = reducer(prevState, action)
    expect(nextState).toEqual(expectedState)

  })

})
