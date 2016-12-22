// @flow
/* eslint-disable max-len */
import reducer, { initialState } from './profile'


it('reducer profile returns initialState by default', () => {

  const expected = initialState
  const actual = reducer(expected, {
    type: 'SOME_UNKNOWN_ACTION',
    payload: {},
  })

  expect(actual).toEqual(expected)

})


it('reducer profile.initialState has expected properties', () => {

  const expected = ['me', 'error', 'isFetching']
  const actual = initialState.keySeq().toJS()

  expect(actual).toEqual(expected)

})
