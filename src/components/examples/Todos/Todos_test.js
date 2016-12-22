// @flow
/* eslint-disable max-len */

// Enzyme docs:
// http://airbnb.io/enzyme/docs/api/index.html

import React from 'react'
import { shallow } from 'enzyme'
import Todos from './Todos'
import { initialState } from '../../../../src/redux/modules/todos'


it('<Todos> renders the Todos content', () => {

  const todos = initialState.get('list')
  const filter = initialState.get('filter')

  const wrapper = shallow(
    <Todos
      todos={todos}
      filter={filter}
      setFilterCurrent={() => {}}
      setFilterDone={() => {}}
    />
  )

  expect(wrapper).toMatchSnapshot()

})
