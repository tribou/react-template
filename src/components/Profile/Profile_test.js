// @flow
/* eslint-disable max-len */

// Enzyme docs:
// http://airbnb.io/enzyme/docs/api/index.html

import test from 'tape'
import React from 'react'
import { render } from 'enzyme'
import Profile from './Profile'
import { Profile as ProfileModel } from '../../redux/modules/profile'


test('<Profile> displays profile info', (t: Object) => {

  const expected = 'Austin, TX'
  const profile = ProfileModel({
    city: expected,
  })

  const wrapper = render(
    <Profile
      me={profile}
    />
  )
  const hasCity = wrapper.text().indexOf(expected) !== -1

  t.equals(hasCity, true)
  t.end()

})
