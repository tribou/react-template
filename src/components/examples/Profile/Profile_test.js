/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable max-len */

// Enzyme docs:
// http://airbnb.io/enzyme/docs/api/index.html

import React from 'react'
import { render } from 'enzyme'
import { Profile as ProfileModel } from 'src/redux/modules/profile'
import Profile from './Profile'


it('<Profile> displays profile info', () => {

  const expected = 'Austin, TX'
  const profile = ProfileModel({
    city: expected,
  })

  const wrapper = render(
    <Profile
      me={profile}
    />
  )
  // const hasCity = wrapper.text().indexOf(expected) !== -1

  expect(wrapper).toMatchSnapshot()
  // expect(hasCity).toBe(true)

})
