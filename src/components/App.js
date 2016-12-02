// @flow
import React from 'react'
import Helmet from 'react-helmet'
import styles from '../styles/variables'


type Props = {
  env: EnvState,
  children: any,
}


const App = (props: Props): React$Element<any> => {

  const { colorTheme } = styles
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
          { name: 'msapplication-TileImage', content: '/static/images/logo.png' },
          { property: 'og:title', content: title },
          { property: 'og:image', content: '/static/images/logo.png' },
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
