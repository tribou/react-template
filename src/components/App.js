// @flow
import React from 'react'
import Helmet from 'react-helmet'
import vars from '../../config/variables'
import type { ReduxProps } from './App.index'


type Props = ReduxProps & {
  children: React$Element<any>,
}

const App = (props: Props): React$Element<any> => {

  const {
    appDescription,
    appIcon,
    appLogo,
    appTitle,
    appLogoWidth,
    appLogoHeight,
    colorTheme,
  } = vars

  const { ROOT_URL } = props

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
      {props.children}
    </div>
  )

}


export default App
