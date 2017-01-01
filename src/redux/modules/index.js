// @flow
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import env from './env'
import request from './request'
import init from './init'

// Examples
import profile from './profile'
import todos from './todos'


const rootReducer = combineReducers({
  env,
  request,
  init,

  // Examples
  profile,
  todos,

  // react-router-redux
  routing,
})


export default rootReducer
