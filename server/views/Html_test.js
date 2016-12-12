/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable max-len */

// Enzyme docs:
// http://airbnb.io/enzyme/docs/api/index.html

import test from 'tape'
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


test('<Html> embeds preloadedState prop in app-state script tag', (t: Object) => {

  const state = { mystate: 'this' }
  const expected = Transit.toJSON(state)
  const wrapper = shallow(
    <Html
      css=""
      assets={{
        vendor: {
          js: '',
        },
        bundle: {
          js: '',
        },
      }}
      head={mockHead}
      preloadedState={state}
    />
  )
  const actual = wrapper.find('#app-state').props().dangerouslySetInnerHTML.__html

  t.equals(actual, expected)
  t.end()

})


test('<Html> embeds css prop in style tag', (t: Object) => {

  const css = '.myCss{height:0;}'
  const expected = css
  const wrapper = shallow(
    <Html
      css={css}
      assets={{
        vendor: {
          js: '',
        },
        bundle: {
          js: '',
        },
      }}
      head={mockHead}
    />
  )
  const actual = wrapper.find('head style').props().dangerouslySetInnerHTML.__html

  t.equals(actual, expected)
  t.end()

})


test('<Html> embeds the vendor asset script', (t: Object) => {

  const asset = '/myFile.js'
  const expected = true
  const wrapper = shallow(
    <Html
      css=""
      assets={{
        vendor: {
          js: asset,
        },
        bundle: {
          js: '',
        },
      }}
      head={mockHead}
    />
  )
  const actual = wrapper.find('body script').contains(
    <script
      type="application/javascript"
      src={asset}
    />
  )

  t.equals(actual, expected)
  t.end()

})


test('<Html> embeds the bundle asset script', (t: Object) => {

  const asset = '/myFile.js'
  const expected = true
  const wrapper = shallow(
    <Html
      css=""
      assets={{
        vendor: {
          js: '',
        },
        bundle: {
          js: asset,
        },
      }}
      head={mockHead}
    />
  )
  const actual = wrapper.find('body script').contains(
    <script
      type="application/javascript"
      src={asset}
    />
  )

  t.equals(actual, expected)
  t.end()

})
