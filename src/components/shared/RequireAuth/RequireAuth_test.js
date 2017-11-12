// @flow

// Enzyme docs:
// http://airbnb.io/enzyme/docs/api/index.html

import React from 'react'
import { shallow } from 'enzyme'
import RequireAuth from './RequireAuth'


const mockProps = {
  location: {
    hash: '',
    search: '',
    pathname: '',
  },
  token: undefined,
  to: undefined,
  children: undefined,
}


it('renders <Redirect> if no token', () => {

  const wrapper = shallow(
    <RequireAuth
      {...mockProps}
    />
  )

  expect(wrapper).toMatchSnapshot()

})


it('passes {to} prop to <Redirect> if no token', () => {

  const to = '/go/here/if/no/auth'
  const wrapper = shallow(
    <RequireAuth
      {...mockProps}
      to={to}
    />
  )

  expect(wrapper.find('Redirect').prop('to')).toEqual(to)

})


it('renders children if token is present', () => {

  const wrapper = shallow(
    <RequireAuth
      {...mockProps}
      token="test"
    >
      <button>Logout</button>
    </RequireAuth>
  )

  expect(wrapper.find('button').text()).toEqual('Logout')

})


it('renders nothing if children and token is not present', () => {

  const wrapper = shallow(
    <RequireAuth
      {...mockProps}
    >
      <button>Logout</button>
    </RequireAuth>
  )

  expect(wrapper.getElement()).toEqual(null)

})


it('renders nothing if no children and token is present', () => {

  const wrapper = shallow(
    <RequireAuth
      {...mockProps}
      token="test"
    />
  )

  expect(wrapper.getElement()).toEqual(null)

})
