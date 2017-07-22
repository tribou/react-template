// @flow
import reducer, { initialState, LOAD, LOAD_SUCCESS } from './init'


it('reducer init returns initialState by default', () => {

  const expected = initialState
  const actual = reducer(expected, {
    type: 'SOME_UNKNOWN_ACTION',
    payload: {},
  })

  expect(actual).toEqual(expected)

})


it('reducer init on LOAD sets isLoading true', () => {

  const expected = {
    isLoading: true,
    loaded: false,
  }
  const actual = reducer(initialState, {
    type: LOAD,
    payload: {},
  })

  expect(actual).toEqual(expected)

})


it('reducer init on LOAD_SUCCESS sets isLoading false, loaded true', () => {

  const expected = {
    loaded: true,
    isLoading: false,
  }
  const actual = reducer(initialState, {
    type: LOAD_SUCCESS,
    payload: {},
  })

  expect(actual).toEqual(expected)

})
