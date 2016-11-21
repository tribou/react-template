// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import OfflineRuntime from 'offline-plugin/runtime'
import routes from './lib/react.routes'
import configureStore from './lib/configureStore'
import { INIT_LOAD_START } from './constants/actions'


const store = configureStore(window.__PRELOADED_STATE__)
const history = syncHistoryWithStore(browserHistory, store)

store.dispatch({ type: INIT_LOAD_START })

ReactDOM.render(

  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,

  document.getElementById('react-mount')
)

OfflineRuntime.install()
