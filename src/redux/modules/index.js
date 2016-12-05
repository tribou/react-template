// @flow
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import init from './init'
import env from './env'


const rootReducer = combineReducers({
  env,
  init,
  routing: routerReducer,
})


export default rootReducer
