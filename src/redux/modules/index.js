// @flow
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import env from './env'
import init from './init'
import profile from './profile'
import todos from './todos'


const rootReducer = combineReducers({
  env,
  init,
  profile,
  todos,
  routing: routerReducer,
})


export default rootReducer
