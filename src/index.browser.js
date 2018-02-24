// @flow
import 'babel-polyfill'
import Debug from 'debug'
import OfflineRuntime from 'offline-plugin/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import InjectTapEventPlugin from 'react-tap-event-plugin'
import Rollbar from 'rollbar/dist/rollbar.umd.min'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from 'src/redux/store'
import { loadSuccess } from 'src/redux/modules/init'
import rollbarConfig from 'config/rollbar'
import vars from 'config/variables'

import Routes from 'src/routes'

// Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'config/muiTheme'

if (process.env.NODE_ENV !== 'development') {

  window.Rollbar = Rollbar.init(rollbarConfig)

}

const { fobReduxStateVar } = vars


InjectTapEventPlugin()

const log = Debug('my-app:index:browser')
const store = configureStore(window[fobReduxStateVar])

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

const mountNode = document.getElementById('react-mount')

ReactDOM.hydrate(

  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Router>
        <Routes />
      </Router>
    </MuiThemeProvider>
  </Provider>,

  mountNode
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

// No worky in React 16
// https://reactjs.org/blog/2017/09/26/react-v16.0.html#react-addons
//
// if (process.env.NODE_ENV === 'development') {

//   const Perf = require('react-addons-perf') // eslint-disable-line
//   window.Perf = Perf

// }
