// @flow
/* eslint-disable react/no-danger */
import React, { Component, PropTypes } from 'react'
import styles from '../../src/styles/variables'


const propTypes = {
  assets: PropTypes.shape({
    bundle: PropTypes.shape({
      js: PropTypes.string.isRequired,
    }),
    vendor: PropTypes.shape({
      js: PropTypes.string.isRequired,
    }),
  }),
  css: PropTypes.string.isRequired,
  children: PropTypes.any,
  preloadedState: PropTypes.object,
}


class Html extends Component {

  static generatePreloadScript (preloadedState: Object): string {

    return `window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}`

  }

  render (): React$Element<any> {

    const title = 'MyApp'
    const themeColor = styles.colorTheme
    const bundle = this.props.assets.bundle.js
    const vendor = this.props.assets.vendor.js

    const css = (
      <style
        dangerouslySetInnerHTML={{ __html: this.props.css }}
      />
    )

    const preloadScript = Html.generatePreloadScript(this.props.preloadedState)

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0 maximum-scale=1.0"
          />
          <meta
            name="description"
            content="The best app ever."
          />
          <meta
            property="og:description"
            content="The best app ever."
          />
          <meta property="og:image" content="/img/logo.png" />
          <meta property="og:url" content="http://www.example.com" />

          <meta name="msapplication-TileColor" content={themeColor} />
          <meta name="msapplication-TileImage" content="/img/logo.png" />
          <meta name="theme-color" content={themeColor} />

          <title>{title}</title>

          <link rel="shortcut icon" href="/img/icon.png" />
          <link rel="apple-touch-icon" href="/img/logo.png" />
          <link rel="apple-touch-icon-precomposed" href="/img/logo@152.png" />

          {css}

        </head>
        <body>
          <div
            id="react-mount"
            dangerouslySetInnerHTML={{ __html: this.props.children }}
          />
          <script
            id="app-state"
            type="application/javascript"
            dangerouslySetInnerHTML={{ __html: preloadScript }}
          />
          <script
            type="application/javascript"
            src={vendor}
          />
          <script
            type="application/javascript"
            src={bundle}
          />
        </body>
      </html>
    )

  }

}

Html.propTypes = propTypes


export default Html
