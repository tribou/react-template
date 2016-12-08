// @flow
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import env from './env'
import init from './init'
import profile from './profile'


const rootReducer = combineReducers({
  env,
  init,
  profile,
  routing: routerReducer,
})


export default rootReducer
