// @flow
/* eslint-disable max-len */
import test from 'tape'
import {
  INIT_LOAD_FAIL,
  INIT_LOAD_START,
  INIT_LOAD_SUCCESS,
} from '../constants/actions.js'
import reducer, { initialState } from './init.js'


test('reducer init returns state by default', (t: Object) => {

  const expected = { isLoading: false, loaded: false }
  const actual = reducer(expected, {
    type: 'SOME_UNKNOWN_ACTION',
  })

  t.deepEqual(actual, expected)
  t.end()

})


test('reducer init returns correct initial state', (t: Object) => {

  const expected = initialState
  const actual = reducer(undefined, { type: undefined })

  t.deepEqual(actual, expected)
  t.end()

})


test('reducer init on INIT_LOAD_START sets isLoading true', (t: Object) => {

  const expected = {
    isLoading: true,
    loaded: false,
  }
  const actual = reducer(initialState, {
    type: INIT_LOAD_START,
  })

  t.deepEqual(actual, expected)
  t.end()

})


test('reducer init on INIT_LOAD_SUCCESS sets isLoading false, loaded true', (t: Object) => {

  const expected = {
    loaded: true,
    isLoading: false,
  }
  const actual = reducer(initialState, {
    type: INIT_LOAD_SUCCESS,
  })

  t.deepEqual(actual, expected)
  t.end()

})


test('reducer init on INIT_LOAD_FAIL sets isLoading false, loaded false', (t: Object) => {

  const expected = {
    loaded: false,
    isLoading: false,
  }
  const actual = reducer(initialState, {
    type: INIT_LOAD_FAIL,
  })

  t.deepEqual(actual, expected)
  t.end()

})
