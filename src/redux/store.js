// @flow
import env from "config/env";
import { applyMiddleware, createStore, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import { offline } from "@redux-offline/redux-offline";
import errorDisplayMiddleware from "src/redux/middleware/errorDisplay";
import offlineConfig from "config/reduxOffline";
import rootEpic from "./epics";
import rootReducer from "./modules";

const { NODE_ENV } = env;

function configureStore(preloadedState?: Object = {}): Object {
  const epicMiddleware = createEpicMiddleware(rootEpic);
  const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  const middleware = [
    epicMiddleware,
    thunk,
    promiseMiddleware(),
    errorDisplayMiddleware
  ];

  // https://github.com/zalmoxisus/redux-devtools-extension
  // https://medium.com/@zalmoxis/using-redux-devtools-in-production-4c5b56c5600f

  // Avoid leak during testing with redux-offline
  const enhancer =
    NODE_ENV === "test"
      ? compose(applyMiddleware(...middleware))
      : composeEnhancers(
          applyMiddleware(...middleware),
          offline(offlineConfig)
        );

  const store = createStore(rootReducer, preloadedState, enhancer);

  // HMR in React Native
  if (module.hot) {
    // eslint-disable-next-line global-require
    module.hot.accept(() => store.replaceReducer(require("./modules").default));
  }

  return store;
}

export default configureStore;
