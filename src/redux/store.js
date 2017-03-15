// @flow
/* eslint-disable arrow-body-style */
import { applyMiddleware, createStore, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import rootEpic from './epics'
import rootReducer from './modules'


function configureStore (preloadedState: GlobalReducerState): Object {

  const epicMiddleware = createEpicMiddleware(rootEpic)

  const middleware = [
    epicMiddleware,
    thunk,
    promiseMiddleware(),
  ]

  // only log redux actions in development
  if (process.env.NODE_ENV === 'development') {

    // logger needs to be last
    // uncomment if needed
    // middleware.push(require('redux-logger').createLogger())

  }

  // https://github.com/zalmoxisus/redux-devtools-extension
  // Only run in the browser
  const isBrowser = typeof window === 'object'
    && typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== 'undefined'

  // Don't run in production
  const composeEnhancers = (process.env.NODE_ENV !== 'production' && isBrowser)
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

  const enhancer = composeEnhancers(applyMiddleware(...middleware))

  const store = createStore(rootReducer, preloadedState, enhancer)


  // Enable Webpack hot module replacement for reducers
  // if (module.hot) {

  //   log('Module is hot!')
  //   module.hot.accept('../reducers', () => {

  //     const nextRootReducer = rootReducer
  //     store.replaceReducer(nextRootReducer)

  //   })

  // }

  return store

}


export default configureStore
