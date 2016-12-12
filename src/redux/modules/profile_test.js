// @flow
/* eslint-disable max-len */
import test from 'tape'
import reducer, {
  initialState,
} from './profile'


test('reducer profile returns initialState by default', (t: Object) => {

  const expected = initialState
  const actual = reducer(expected, {
    type: 'SOME_UNKNOWN_ACTION',
    payload: {},
  })

  t.deepEqual(actual, expected)
  t.end()

})


test('reducer profile.initialState has expected properties', (t: Object) => {

  const expected = ['me']
  const actual = initialState.keySeq().toJS()

  t.deepEqual(actual, expected)
  t.end()

})
