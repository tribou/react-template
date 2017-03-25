// @flow
/* eslint-disable max-len */

// Enzyme docs:
// http://airbnb.io/enzyme/docs/api/index.html

import React from 'react'
import { shallow } from 'enzyme'
import { initialState } from 'src/redux/modules/todos'
import Todos from './Todos'

const mockProps = {
  setFilterCurrent: () => {},
  setFilterDone: () => {},
  getTodos: () => {},
}

it('<Todos> renders the Todos content', () => {

  const todos = initialState.get('list')
  const filter = initialState.get('filter')

  const wrapper = shallow(
    <Todos
      {...mockProps}
      todos={todos}
      filter={filter}
    />
  )

  expect(wrapper).toMatchSnapshot()

})
