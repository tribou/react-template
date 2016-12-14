// @flow
import React from 'react'
import Helmet from 'react-helmet'
import vars from '../../config/variables'


import type { ReduxProps } from './App.index'

type Props = ReduxProps & {
  children: React$Element<any>,
}


const App = (props: Props): React$Element<any> => {

  const { colorTheme, imgLogoSmWidth, imgLogoSmHeight } = vars
  const { ROOT_URL } = props.env
  const title = 'Ooober'
  const description = 'The best app ever.'

  return (
    <div id="application">
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        defaultTitle={title}
        titleTemplate={`${title} - %s`}
        meta={[
          { name: 'theme-color', content: colorTheme },
          { name: 'msapplication-TileColor', content: colorTheme },
          { name: 'msapplication-TileImage', content: `${ROOT_URL}/static/images/logo.png` },
          { property: 'og:title', content: title },
          { property: 'og:image', content: `${ROOT_URL}/static/images/logo.png` },
          { property: 'og:image:width', content: imgLogoSmWidth },
          { property: 'og:image:height', content: imgLogoSmHeight },
          { property: 'og:url', content: ROOT_URL },
          { property: 'og:description', content: description },
          { name: 'description', content: description },
        ]}
        link={[
          { rel: 'shortcut icon', href: '/static/images/logo.png' },
          { rel: 'apple-touch-icon', href: '/static/images/logo.png' },
        ]}
      />

      {props.children}

    </div>
  )

}


export default App
