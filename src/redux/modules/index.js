// @flow

// Can replace with individual operators with code-splitting in the future if
// bundle size becomes an issue.
// https://redux-observable.js.org/docs/Troubleshooting.html
import 'rxjs'
import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'
import { routerReducer } from 'react-router-redux'
import env from './env'
import init from './init'
import profile, { fetchProfileEpic } from './profile'
import todos from './todos'


// redux-observable
// Full example: http://jsbin.com/jexomi/edit?js,output
export const rootEpic = combineEpics(
  fetchProfileEpic,
)

export const rootReducer = combineReducers({
  env,
  init,
  profile,
  todos,
  routing: routerReducer,
})
