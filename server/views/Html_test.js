// @flow
/* eslint-disable max-len */

// Enzyme docs:
// http://airbnb.io/enzyme/docs/api/index.html

import React from 'react'
import Transit from 'transit-immutable-js'
import { shallow } from 'enzyme'
import Html from './Html'


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
  bundle: {
    css: '',
    js: '',
  },
}

const mockProps = {
  assets: mockAssets,
  css: '',
  head: mockHead,
  preloadedState: {
    mystate: 'this',
  },
  rollbarScript: '',
}


it('<Html> embeds preloadedState prop in app-state script tag', () => {

  const state = { mystate: 'this' }
  const expected = Transit.toJSON(state)
  const wrapper = shallow(
    <Html
      {...mockProps}
      preloadedState={state}
    />
  )
  const actual = wrapper.find('#app-state').props().dangerouslySetInnerHTML.__html

  expect(actual).toBe(expected)

})


it('<Html> embeds css prop in style tag', () => {

  const css = '.myCss{height:0;}'
  const expected = css
  const wrapper = shallow(
    <Html
      {...mockProps}
      css={css}
    />
  )
  const actual = wrapper.find('head style').props().dangerouslySetInnerHTML.__html

  expect(actual).toBe(expected)

})


it('<Html> embeds the vendor asset script', () => {

  const asset = '/myFile.js'
  const assets = {
    ...mockAssets,
    vendor: {
      js: asset,
    },
  }
  const expected = true
  const wrapper = shallow(
    <Html
      {...mockProps}
      assets={assets}
    />
  )
  const actual = wrapper.find('body script').contains(
    <script
      defer
      type="application/javascript"
      src={asset}
    />
  )

  expect(actual).toBe(expected)

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
  const expected = true
  const wrapper = shallow(
    <Html
      {...mockProps}
      assets={assets}
    />
  )
  const actual = wrapper.find('body script').contains(
    <script
      defer
      type="application/javascript"
      src={asset}
    />
  )

  expect(actual).toBe(expected)

})
