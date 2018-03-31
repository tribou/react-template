// @flow
import env from 'config/env'
import { applyMiddleware, createStore, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
// eslint-disable-next-line import/no-extraneous-dependencies
import { offline } from '@redux-offline/redux-offline'
import devTools from 'src/redux/devtools'
import errorDisplayMiddleware from 'src/redux/middleware/errorDisplay'
import offlineConfig from './reduxOfflineConfig'
import rootEpic from './epics'
import rootReducer from './modules'

const { NODE_ENV } = env


function configureStore (preloadedState?: Object = {}): Object {

  const epicMiddleware = createEpicMiddleware(rootEpic)

  const middleware = [
    epicMiddleware,
    thunk,
    promiseMiddleware(),
    errorDisplayMiddleware,
  ]

  // only log redux actions in development
  if (NODE_ENV === 'development') {

    // logger needs to be last
    // uncomment if needed
    // middleware.push(require('redux-logger').createLogger())

  }

  // https://github.com/zalmoxisus/redux-devtools-extension
  // https://medium.com/@zalmoxis/using-redux-devtools-in-production-4c5b56c5600f

  // Avoid leak during testing with redux-offline
  const enhancer = NODE_ENV === 'test'
    ? compose(
      applyMiddleware(...middleware),
    )
    : compose(
      applyMiddleware(...middleware),
      offline(offlineConfig),
      devTools()
    )


  const store = createStore(rootReducer, preloadedState, enhancer)

  // HMR in React Native
  if (module.hot) {

    module.hot.accept(() =>
      store.replaceReducer(require('./modules').default)) // eslint-disable-line

  }

  return store

}


export default configureStore
