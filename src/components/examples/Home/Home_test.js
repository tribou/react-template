// @flow
/* eslint-disable max-len */

// Enzyme docs:
// http://airbnb.io/enzyme/docs/api/index.html

import React from 'react'
import { shallow } from 'enzyme'
import Home from './Home'


it('<Home> renders the Home content', () => {

  const wrapper = shallow(
    <Home />
  )

  expect(wrapper).toMatchSnapshot()

})
