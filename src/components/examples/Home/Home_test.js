// @flow
/* eslint-disable max-len */

// Enzyme docs:
// http://airbnb.io/enzyme/docs/api/index.html

import React from 'react'
import { shallow } from 'enzyme'
import Home from './Home'


type OverrideProps = {
  authenticated: any,
  logout: Function,
  history: Object,
}

const mockProps: OverrideProps = {
  authenticated: false,
  logout: () => {},
  history: {
    replace: () => {},
  },
}

it('<Home> renders the Home content', () => {

  const wrapper = shallow(
    <Home
      {...mockProps}
    />
  )

  expect(wrapper).toMatchSnapshot()

})


it('<Home> renders the logout button if authenticated', () => {

  const wrapper = shallow(
    <Home
      {...mockProps}
      authenticated
    />
  )

  expect(wrapper).toMatchSnapshot()

})
