// @flow
import React, { Component } from "react";
// import { StatusBar } from 'react-native'
import { Provider } from "react-redux";
import { NativeRouter } from "react-router-native";
// import codePush from 'react-native-code-push'
import configureStore from "src/redux/store";

import Routes from "src/routes";

const store = configureStore();

// const codePushOptions = {
//   checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
// }

/* HTTP DEBUG: uncomment for debug http request in ChromeDevTool */
// XMLHttpRequest = GLOBAL.originalXMLHttpRequest
//   ? GLOBAL.originalXMLHttpRequest
//   : GLOBAL.XMLHttpRequest
// // fetch logger
// global._fetch = fetch
// global.fetch = (uri, options, ...args) => {
//   return global._fetch(uri, options, ...args).then((response) => {
//     console.info('Fetch', { request: { uri, options, ...args }, response })
//     return response
//   })
// }
/* END HTTP DEBUG */

class ReactTemplate extends Component<void> {
  // componentDidMount () {

  //   StatusBar.setHidden(true)

  // }

  render() {
    return (
      <Provider store={store}>
        <NativeRouter>
          <Routes />
        </NativeRouter>
      </Provider>
    );
  }
}

// export default codePush(codePushOptions)(ProductionCliq)
export default ReactTemplate;
