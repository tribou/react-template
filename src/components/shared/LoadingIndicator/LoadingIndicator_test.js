// @flow
/* eslint-disable max-len */

// Enzyme docs:
// http://airbnb.io/enzyme/docs/api/index.html

import React from 'react'
import { shallow } from 'enzyme'
import LoadingIndicator from './LoadingIndicator'


const mockProps = {
}


it('<LoadingIndicator> renders the LoadingIndicator content', () => {

  const wrapper = shallow(
    <LoadingIndicator
      {...mockProps}
      weAreLoading
    />
  )

  expect(wrapper).toMatchSnapshot()

})


it('<LoadingIndicator> returns null when not loading', () => {

  const wrapper = shallow(
    <LoadingIndicator
      {...mockProps}
      weAreLoading={false}
    />
  )

  expect(wrapper.html()).toBe(null)

})
