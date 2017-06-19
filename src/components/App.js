// @flow
import React from 'react'
import Helmet from 'react-helmet'
import { Route, Redirect, Switch } from 'react-router'

import Home from 'src/components/examples/Home/Home.index'
import Profile from 'src/components/examples/Profile/Profile.index'
import Todos from 'src/components/examples/Todos/Todos.index'

import Modal from 'src/components/Modal/Modal.index'
import LoadingIndicator from 'src/components/shared/LoadingIndicator/LoadingIndicator.index'
import ErrorMessage from 'src/components/shared/ErrorMessage/ErrorMessage.index'
import vars from 'config/variables'
import type { ReduxProps } from './App.index'


type Props = ReduxProps & {
  location: Object,
}

const App = (props: Props): React$Element<*> => {

  const {
    appDescription,
    appIcon,
    appLogo,
    appTitle,
    appLogoWidth,
    appLogoHeight,
    colorTheme,
  } = vars

  const {
    ROOT_URL,
    location,
  } = props

  return (
    <div id="application">
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        defaultTitle={appTitle}
        titleTemplate={`${appTitle} - %s`}
        meta={[
          { name: 'theme-color', content: colorTheme },
          { name: 'msapplication-TileColor', content: colorTheme },
          { name: 'msapplication-TileImage', content: `${ROOT_URL}${appLogo}` },
          { property: 'og:title', content: appTitle },
          { property: 'og:image', content: `${ROOT_URL}${appLogo}` },
          { property: 'og:image:width', content: appLogoWidth },
          { property: 'og:image:height', content: appLogoHeight },
          { property: 'og:url', content: ROOT_URL },
          { property: 'og:description', content: appDescription },
          { name: 'description', content: appDescription },
        ]}
        link={[
          { rel: 'shortcut icon', href: appIcon },
          { rel: 'apple-touch-icon', href: appIcon },
        ]}
      />
      <LoadingIndicator />

      {/* Example Routes */}
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/todos" component={Todos} />
        <Redirect exact from="/" to="/home" />
      </Switch>

      {/*
          <Route path="*" component={NotFound} />
          */}

      <ErrorMessage />
      <Modal location={location} />
    </div>
  )

}


export default App
