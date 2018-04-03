// @flow
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/html-has-lang */
import React from "react";
import { json } from "secure-filters";
import vars from "config/variables";

const { fobReduxStateVar, fobWebpackManiVar } = vars;

type Props = {
  assets: BuildAssets,
  css: string,
  children: any,
  head: Object,
  preloadedState: Object
};

export function generateScript(v: string, o: ?Object): string {
  return `window.${v} = ${json(JSON.stringify(o) || "")}`;
}

const Html = (props: Props) => {
  const { assets, children, head, preloadedState } = props;

  const bundle = assets.bundle.js;
  const manifest = assets.manifest.js;
  const vendor = assets.vendor.js;
  const { webpackMani } = assets;
  const attrs = head.htmlAttributes.toComponent();

  const css = <style dangerouslySetInnerHTML={{ __html: props.css }} />;

  const preloadScript = generateScript(fobReduxStateVar, preloadedState);
  const maniScript = generateScript(fobWebpackManiVar, webpackMani);

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
        <div id="react-mount" dangerouslySetInnerHTML={{ __html: children }} />
        <script
          defer
          id="app-state"
          type="application/javascript"
          dangerouslySetInnerHTML={{ __html: preloadScript }}
        />
        <script
          defer
          id="chunk-manifest"
          type="application/javascript"
          dangerouslySetInnerHTML={{ __html: maniScript }}
        />
        <script defer type="application/javascript" src={manifest} />
        <script defer type="application/javascript" src={vendor} />
        <script defer type="application/javascript" src={bundle} />
      </body>
    </html>
  );
};

export default Html;
