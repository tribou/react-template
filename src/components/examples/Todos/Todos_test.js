// @flow

// Enzyme docs:
// http://airbnb.io/enzyme/docs/api/index.html

import React from "react";
import { shallow } from "enzyme";
import { initialState } from "src/redux/modules/examples/todos";
import Todos from "./Todos";

const mockProps = {
  setFilterCurrent: jest.fn(),
  setFilterDone: jest.fn(),
  getTodos: jest.fn()
};

it("<Todos> renders the Todos content", () => {
  const todos = initialState.list;
  const filter = initialState.filter;

  const wrapper = shallow(
    <Todos {...mockProps} todos={todos} filter={filter} />
  );

  expect(wrapper).toMatchSnapshot();
});
