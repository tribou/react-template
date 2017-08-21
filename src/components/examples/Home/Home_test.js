// @flow

// Enzyme docs:
// http://airbnb.io/enzyme/docs/api/index.html

import React from 'react'
import { shallow } from 'enzyme'
import Home from './Home'


type OverrideProps = {
  token?: string,
  logout: Function,
  history: Object,
}

const mockProps: OverrideProps = {
  token: undefined,
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
      token="test"
    />
  )

  expect(wrapper).toMatchSnapshot()

})
