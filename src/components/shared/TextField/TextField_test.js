// @flow

// Enzyme docs:
// http://airbnb.io/enzyme/docs/api/index.html

import React from 'react'
import { shallow } from 'enzyme'
import TextField from './TextField'


const mockProps = {
  input: {},
  style: {},
  label: 'Username',
  meta: { touched: false, error: false },
  dispatch: jest.fn(),
  customStyles: {},
}


it('<TextField> renders the TextField content', () => {

  const wrapper = shallow(
    <TextField
      {...mockProps}
    />
  )

  expect(wrapper).toMatchSnapshot()

})
