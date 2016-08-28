// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
// import OfflineRuntime from 'offline-plugin/runtime'
import routes from './lib/react.routes.js'
import configureStore from './lib/configureStore.js'
import { INIT_LOAD_START } from './constants/actions.js'

// OfflineRuntime.install()

const store = configureStore(window.__PRELOADED_STATE__)

store.dispatch({ type: INIT_LOAD_START })

ReactDOM.render(

  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,

  document.getElementById('react-mount')
)
