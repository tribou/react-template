// @flow
import 'babel-polyfill'
import Debug from 'debug'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import OfflineRuntime from 'offline-plugin/runtime'
import routes from './lib/react.routes'
import configureStore from './lib/configureStore'
import { loadComplete } from './actions/init'

const log = Debug('my-app:browser:index')
const store = configureStore(window.__PRELOADED_STATE__)
const history = syncHistoryWithStore(browserHistory, store)

window.onload = () => {

  store.dispatch(loadComplete())
  // Can replace with API/store call checks in the future:
  // {
  //   loadedChannels: true,
  //   loadedMessages: true,
  // }

  // Reset this handler when we're done
  window.onload = null


}

ReactDOM.render(

  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,

  document.getElementById('react-mount')
)

// Progressively apply ServiceWorker updates so browser can simply be refreshed
// to reflect changes with window.location.reload()
// TODO: Fire redux action
OfflineRuntime.install({
  onUpdateReady: () => {

    log('onUpdateReady')
    OfflineRuntime.applyUpdate()

  },
})
