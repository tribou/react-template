// @flow

// Enzyme docs:
// http://airbnb.io/enzyme/docs/api/index.html

import React from 'react'
import { shallow } from 'enzyme'
import Home from './Home'


type OverrideProps = {
  logout: Function,
  history: Object,
}

const mockProps: OverrideProps = {
  logout: () => {},
  history: {
    replace: () => {},
  },
}

it('renders the Home page content', () => {

  const wrapper = shallow(
    <Home
      {...mockProps}
    />
  )

  expect(wrapper).toMatchSnapshot()

})
