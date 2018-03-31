// @flow
import "babel-polyfill";
// import Debug from 'debug'
// import OfflineRuntime from 'offline-plugin/runtime'
import React from "react";
import ReactDOM from "react-dom";
import Rollbar from "rollbar/dist/rollbar.umd.min";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import configureStore from "src/redux/store";
import { loadSuccess } from "src/redux/modules/init";
import rollbarConfig from "config/rollbar";

import Routes from "src/routes";

// Material-UI
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "config/muiTheme";

if (process.env.NODE_ENV !== "development") {
  window.Rollbar = Rollbar.init(rollbarConfig);
}

// const log = Debug('my-app:index:desktop')
const store = configureStore({});

window.onload = () => {
  store.dispatch(loadSuccess());
  // Can replace with API/store call checks in the future:
  // {
  //   loadedChannels: true,
  //   loadedMessages: true,
  // }

  // Reset this handler when we're done
  window.onload = null;
};

window.onunload = () => {
  // May be needed for Cognito sessions
  // Storage.Clear()
};

const mountNode = document.getElementById("react-mount");

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Router>
        <Routes />
      </Router>
    </MuiThemeProvider>
  </Provider>,

  mountNode
);

// Progressively apply ServiceWorker updates so browser can simply be refreshed
// to reflect changes with window.location.reload()
// TODO: Fire redux action
// OfflineRuntime.install({
//   onUpdateReady: () => {

//     log('onUpdateReady')
//     OfflineRuntime.applyUpdate()

//   },
// })
