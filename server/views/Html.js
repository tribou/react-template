// @flow
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/html-has-lang */
import React, { Component } from 'react'
import Transit from 'transit-immutable-js'


type Props = {
  assets: BuildAssets,
  css: string,
  children: any,
  head: Object,
  preloadedState: Object,
}

function fillWindowVar (v, o) {

  return `window.${v} = ${(JSON.stringify(o) || '').replace(/</g, '\\u003c')}`

}


class Html extends Component {

  static generatePreloadScript (preloadedState: Object): string {

    return Transit.toJSON(preloadedState)

  }

  static generateEnvScript (env: ?Object): string {

    return fillWindowVar('__ENV__', env)

  }

  static generateManiScript (mani: ?Object): string {

    return fillWindowVar('__MANI_FOR_WEBPACK__', mani)

  }

  props: Props

  render (): React$Element<any> {

    const { assets, head, preloadedState: { env } } = this.props

    const bundle = assets.bundle.js
    const manifest = assets.manifest.js
    const vendor = assets.vendor.js
    const { webpackMani } = assets
    const attrs = head.htmlAttributes.toComponent()

    const css = (
      <style
        dangerouslySetInnerHTML={{ __html: this.props.css }}
      />
    )

    const preloadScript = Html.generatePreloadScript(this.props.preloadedState)
    const envScript = Html.generateEnvScript(env)
    const maniScript = Html.generateManiScript(webpackMani)

    return (
      <html {...attrs}>
        <head>

          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0 maximum-scale=1.0"
          />

          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {css}

        </head>
        <body>
          <div
            id="react-mount"
            dangerouslySetInnerHTML={{ __html: this.props.children }}
          />
          <script
            defer
            id="app-state"
            type="application/transit+json"
            dangerouslySetInnerHTML={{ __html: preloadScript }}
          />
          <script
            defer
            id="env-state"
            type="application/javascript"
            dangerouslySetInnerHTML={{ __html: envScript }}
          />
          <script
            defer
            id="chunk-manifest"
            type="application/javascript"
            dangerouslySetInnerHTML={{ __html: maniScript }}
          />
          <script
            defer
            type="application/javascript"
            src={manifest}
          />
          <script
            defer
            type="application/javascript"
            src={vendor}
          />
          <script
            defer
            type="application/javascript"
            src={bundle}
          />
        </body>
      </html>
    )

  }

}


export default Html
