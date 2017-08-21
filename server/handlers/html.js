// @flow
import Boom from 'boom'
import Fs from 'fs'
import Path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import Helmet from 'react-helmet'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import { Base64 } from 'js-base64'
import { getAssets } from 'server/utils'
import configureStore from 'src/redux/store'
import { initialState as authInitialState } from 'src/redux/modules/auth'
import Routes from 'src/routes'
import env from 'config/env'
import vars from 'config/variables'

// Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'config/muiTheme'

// Default render options for react templates
// 'renderToStaticMarkup' omits react data properties
// 'renderToString' is used for re-hydrating on client-side
const defaultRenderOptions = {
  runtimeOptions: {
    docType: '<!DOCTYPE html>',
    renderMethod: 'renderToString',
  },
}


const routedHtml = (request: Object, reply: Function) => {

  if (module.hot) {

    module.hot.accept([
      'src/routes',
      'src/helpers/auth',
      'src/redux/store',
      'src/redux/modules/auth',
      'config/env',
      'config/variables',
    ], () => {})

  }

  // Paths relative to inside build/ only in prod
  const assets = getAssets()
  const cssPath = './public/styles.css'
  const cssFile = Path.resolve(__dirname, cssPath)
  let css = ''

  try {

    css = Fs.readFileSync(cssFile, 'utf-8')
    request.log(['info', 'css'], css.length)

  }
  catch (error) {

    request.log(['error', 'css'], error)

  }

  request.log(['info'], request.url.href)

  // Inject server request info
  const _request = { userAgent: request.headers['user-agent'] }
  request.log(['info', 'user-agent'], _request.userAgent)

  const token = Base64.decode(request.state[vars.appAuthCookieKey])

  // Pass initial state to store along with server ENV vars
  const store = configureStore({
    auth: {
      ...authInitialState,
      token,
    },
    env,
    request: _request,
  })

  const muiTheme = getMuiTheme(_request.userAgent)

  // Let react-router match the raw URL to generate the
  // RouterContext here on the server

  const context = {}

  // Get rendered router context
  const children = renderToString(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <StaticRouter
          location={request.url.href}
          context={context}
        >
          <Routes />
        </StaticRouter>
      </MuiThemeProvider>
    </Provider>
  )

  // Only redirect, no code
  if (context.url && !context.code) {

    return reply
      .redirect(context.url)
      .temporary()

  }
  // Both redirect and code! ZOMG!
  else if (context.url && context.code) {

    return reply
      .redirect(context.url)
      .code(context.code)

  }

  // Get resulting store state
  const preloadedState = store.getState()

  // Get resulting head info
  const head = Helmet.rewind()

  // Inject the RouterContext into the props sent to the layout
  const htmlProps = {
    assets,
    children,
    css,
    head,
    preloadedState,
  }

  // Render the layout with props
  return request.render(
    'Html',
    htmlProps,
    defaultRenderOptions,
    (errorLayout: string, output: string): any => {

      if (errorLayout) {

        request.log(['error', 'view'], errorLayout)
        return reply(Boom.serverTimeout(errorLayout))

      }

      // No redirect, only code
      if (!context.url && context.code) return reply(output).code(context.code)

      return reply(output)

    }
  )

}


export default routedHtml
