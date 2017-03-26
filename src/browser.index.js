// @flow
import 'babel-polyfill'
import Debug from 'debug'
import OfflineRuntime from 'offline-plugin/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import Rollbar from 'rollbar-browser/dist/rollbar.umd.nojson.min'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Transit from 'transit-immutable-js'
import getRoutes from 'src/routes'
import { getAuthToken, requireAuth } from 'src/helpers/auth'
import configureStore from 'src/redux/store'
import { loadSuccess } from 'src/redux/modules/init'
import rollbarConfig from 'config/rollbar'

if (process.env.NODE_ENV !== 'development') {

  window.Rollbar = Rollbar.init(rollbarConfig)

}

const log = Debug('my-app:browser:index')
const appStateElement = document.getElementById('app-state')
const serializedState = appStateElement ? appStateElement.innerHTML : '{}'
const store = configureStore(Transit.fromJSON(serializedState), browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

window.onload = () => {

  store.dispatch(loadSuccess())
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
    <Router routes={getRoutes(requireAuth(getAuthToken))} history={history} />
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

if (process.env.NODE_ENV === 'development') {

  const Perf = require('react-addons-perf') // eslint-disable-line
  window.Perf = Perf

}
