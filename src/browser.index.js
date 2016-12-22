// @flow
import 'babel-polyfill'
import Debug from 'debug'
import OfflineRuntime from 'offline-plugin/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Transit from 'transit-immutable-js'
import routes from './routes'
import configureStore from './redux/store'
import { loadSuccess } from './redux/modules/init'

const log = Debug('my-app:browser:index')

const serializedState = document.getElementById('app-state').innerHTML
const store = configureStore(Transit.fromJSON(serializedState))
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

if (process.env.NODE_ENV === 'development') {

  const Perf = require('react-addons-perf') // eslint-disable-line
  window.Perf = Perf

}
