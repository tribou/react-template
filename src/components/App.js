// @flow
import React from 'react'
import Helmet from 'react-helmet'
import styles from '../styles/variables'


const App = (props: { children: any }): React$Element<any> => {

  const { colorTheme } = styles
  const description = 'The best app ever.'

  return (
    <div id="application">
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        defaultTitle="OooberApp"
        titleTemplate="OooberApp - %s"
        meta={[
          { name: 'theme-color', content: colorTheme },
          { name: 'msapplication-TileColor', content: colorTheme },
          { name: 'msapplication-TileImage', content: '/static/images/logo.png' },
          { property: 'og:image', content: '/static/images/logo.png' },
          { property: 'og:url', content: 'http://www.example.com' },
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
