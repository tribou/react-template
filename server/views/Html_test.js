// @flow

// Enzyme docs:
// http://airbnb.io/enzyme/docs/api/index.html

import React from 'react'
import ReactDOM from 'react-dom/server'
import Cheerio from 'cheerio'
import vars from 'config/variables'
import Html, { generateScript } from './Html'

const { fobReduxStateVar } = vars


// react-helmet mocks
const mockComponent = {
  toComponent: () => {},
}
const mockHead = {
  htmlAttributes: mockComponent,
  link: mockComponent,
  meta: mockComponent,
  title: mockComponent,
}

const mockAssets = {
  vendor: {
    js: '',
  },
  manifest: {
    js: '',
  },
  bundle: {
    css: '',
    js: '',
  },
  webpackMani: {},
}

const mockProps = {
  assets: mockAssets,
  css: '',
  head: mockHead,
  preloadedState: {
    mystate: 'this',
  },
  rollbarScript: '',
  children: <div />,
}


it('<Html> embeds preloadedState prop in app-state script tag', () => {

  const state = { mystate: 'this' }
  const expected = generateScript(fobReduxStateVar, state)

  const string = ReactDOM.renderToString(
    <Html
      {...mockProps}
      preloadedState={state}
    />
  )
  const $ = Cheerio.load(string)

  expect($('script').html()).toBe(expected)

})


it('<Html> embeds css prop in style tag', () => {

  const css = '.myCss{height:0;}'
  const expected = css

  const string = ReactDOM.renderToString(
    <Html
      {...mockProps}
      css={css}
    />
  )
  const $ = Cheerio.load(string)

  expect($('head style').html()).toBe(expected)

})


it('<Html> embeds the vendor asset script', () => {

  const asset = '/myFile.js'
  const assets = {
    ...mockAssets,
    vendor: {
      js: asset,
    },
  }

  const string = ReactDOM.renderToString(
    <Html
      {...mockProps}
      assets={assets}
    />
  )
  const $ = Cheerio.load(string)

  const target = $('body').find(`script[src="${asset}"]`)
  expect(target.length).toBe(1)

})


it('<Html> embeds the bundle asset script', () => {

  const asset = '/myFile.js'
  const assets = {
    ...mockAssets,
    bundle: {
      ...mockAssets.bundle,
      js: asset,
    },
  }

  const string = ReactDOM.renderToString(
    <Html
      {...mockProps}
      assets={assets}
    />
  )
  const $ = Cheerio.load(string)

  const target = $('body').find(`script[src="${asset}"]`)
  expect(target.length).toBe(1)

})
