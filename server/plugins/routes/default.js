// @flow
import React from "react";
import { renderToString } from "react-dom/server";
import Helmet from "react-helmet";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router";
import { Base64 } from "js-base64";
import { getAssets, getCss } from "server/utils";
import configureStore from "src/redux/store";
import { initialState as authInitialState } from "src/redux/modules/auth";
import Routes from "src/routes";
import env from "config/env";
import vars from "config/variables";
import { getTodos } from "src/redux/modules/examples/todos";

// Material-UI
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "config/muiTheme";

export default {
  name: "defaultReactRoute",
  version: "1.0.0",
  register: (server: Object) => {
    server.route({
      method: "GET",
      path: "/{param*}",
      handler: async (request: Object, h: Function) => {
        if (module.hot) {
          module.hot.accept(
            [
              "src/routes",
              "src/redux/store",
              "src/redux/modules/auth",
              "config/env",
              "config/variables",
              "server/utils"
            ],
            () => {}
          );
        }

        // Inject server request info
        const _request = { userAgent: request.headers["user-agent"] };

        const muiTheme = getMuiTheme(_request.userAgent);

        const cookie = request.state[vars.appAuthCookieKey];
        const token = cookie ? Base64.decode(cookie) : "";

        // Pass initial state to store along with server ENV vars
        const store = configureStore({
          auth: {
            ...authInitialState,
            token
          },
          env,
          request: _request
        });

        // DISPATCH ASYNC SERVER-SIDE CALLS HERE
        //
        // SEO, meta tags, etc
        //
        // Can simply await any redux-promise-middleware action
        await store.dispatch(getTodos());
        // If you're getting meta tags info, be sure to set using react-helmet
        // inside the respective component. (Don't mess with it here)

        // Let react-router match the raw URL to generate the
        // RouterContext here on the server
        const context = {};

        // Get rendered router context
        const children = renderToString(
          <Provider store={store}>
            <MuiThemeProvider muiTheme={muiTheme}>
              <StaticRouter location={request.url.href} context={context}>
                <Routes />
              </StaticRouter>
            </MuiThemeProvider>
          </Provider>
        );

        // Redirects that can return early
        //
        // Only redirect, no code
        if (context.url && !context.code) {
          return h
            .response()
            .redirect(context.url)
            .temporary();
        } else if (context.url && context.code) {
          // Both redirect and code! ZOMG!
          return h
            .response()
            .redirect(context.url)
            .code(context.code);
        }

        // Get resulting store state
        const preloadedState = store.getState();

        // Get resulting head info
        const head = Helmet.rewind();

        const htmlProps = {
          assets: getAssets(),
          children,
          css: getCss(),
          head,
          preloadedState
        };

        // Render the layout with props
        const response = h.view("Html", htmlProps);

        // If code but no redirect (e.g. 4xx page, 5xx page...)
        if (!context.url && context.code) return response.code(context.code);

        return response;
      }
    });
  }
};
