// @flow
import reducer from './reducer'
import initialState from './initialState'
import { LOAD, LOAD_SUCCESS } from './consts'

it('reducer init returns initialState by default', () => {

  const expected = initialState
  const action = { type: 'SOME_UNKNOWN_ACTION', payload: {} }
  const actual = reducer(expected, action)
  expect(actual).toEqual(expected)

})

it('reducer init on LOAD sets isLoading true', () => {

  const expected = { isLoading: true, loaded: false }
  const action = { type: LOAD, payload: {} }
  const actual = reducer(initialState, action)
  expect(actual).toEqual(expected)

})

it('reducer init on LOAD_SUCCESS sets isLoading false, loaded true', () => {

  const expected = { loaded: true, isLoading: false }
  const action = { type: LOAD_SUCCESS, payload: {} }
  const actual = reducer(initialState, action)
  expect(actual).toEqual(expected)

})
