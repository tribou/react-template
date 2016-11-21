// @flow
import { combineReducers } from 'redux'
import init from './init'
import env from './env'

const rootReducer = combineReducers({
  env,
  init,
})

export default rootReducer
