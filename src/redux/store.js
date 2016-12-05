// @flow
/* eslint-disable arrow-body-style */
import { applyMiddleware, createStore, compose } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './modules'


function configureStore (initialState: ?GlobalReducerState): Object {

  // only log redux actions in development
  const middleware = [
    thunk,
  ]

  if (process.env.NODE_ENV === 'development') {

    // logger needs to be last
    middleware.push(createLogger())

  }

  const store = createStore(
    rootReducer,
    initialState,

    compose(

      applyMiddleware(...middleware),

      // https://github.com/zalmoxisus/redux-devtools-extension
      typeof window === 'object'
        && typeof window.devToolsExtension !== 'undefined'
        ? window.devToolsExtension()
        : (f: any) => f

    )
  )

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
