// @flow
/* eslint-disable max-len */
import test from 'tape'
import React from 'react'
import { shallow } from 'enzyme'
import Html from './Html'


test('<Html> embeds preloadedState prop in app-state script tag', (t: Object) => {

  const state = { mystate: 'this' }
  const expected = `window.__PRELOADED_STATE__ = ${JSON.stringify(state)}`
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
