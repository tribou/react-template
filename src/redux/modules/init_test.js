// @flow
/* eslint-disable max-len */
import test from 'tape'
import reducer, {
  initialState,
  LOAD,
  LOAD_SUCCESS,
} from './init'


test('reducer init returns state by default', (t: Object) => {

  const expected = initialState
  const actual = reducer(expected, {
    type: 'SOME_UNKNOWN_ACTION',
  })

  t.deepEqual(actual, expected)
  t.end()

})


test('reducer init on LOAD sets isLoading true', (t: Object) => {

  const expected = {
    isLoading: true,
    loaded: false,
  }
  const actual = reducer(initialState, {
    type: LOAD,
  })

  t.deepEqual(actual, expected)
  t.end()

})


test('reducer init on LOAD_SUCCESS sets isLoading false, loaded true', (t: Object) => {

  const expected = {
    loaded: true,
    isLoading: false,
  }
  const actual = reducer(initialState, {
    type: LOAD_SUCCESS,
  })

  t.deepEqual(actual, expected)
  t.end()

})
