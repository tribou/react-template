// @flow
/* eslint-disable max-len */

// Enzyme docs:
// http://airbnb.io/enzyme/docs/api/index.html

import React from 'react'
import { shallow } from 'enzyme'
import Profile from './Profile'

type OverrideProps = {
  me: Object,
  error: string,
  location: Object,
  history: Object,
  fetchProfile: Function,
}

const mockProps: OverrideProps = {
  me: {
    get: () => null,
  },
  error: '',
  location: {},
  history: {
    replace: () => {},
  },
  fetchProfile: () => {},
}

it('<Profile> renders the Profile content', () => {

  const wrapper = shallow(
    <Profile
      {...mockProps}
    />
  )

  expect(wrapper).toMatchSnapshot()

})
