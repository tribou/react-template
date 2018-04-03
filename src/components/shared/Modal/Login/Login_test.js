// @flow

// Enzyme docs:
// http://airbnb.io/enzyme/docs/api/index.html

import React from "react";
import { shallow } from "enzyme";
import Login from "./Login";

const mockProps = {
  history: {
    push: jest.fn(),
    replace: jest.fn()
  },
  handleSubmit: jest.fn(),
  location: { pathname: "/" },
  error: ""
};

it("<Login> renders the Login content", () => {
  const wrapper = shallow(
    <Login {...mockProps} submitting={false} asyncValidating={false} />
  );

  expect(wrapper).toMatchSnapshot();
});

it("<Login> renders when form is submitting", () => {
  const wrapper = shallow(
    <Login {...mockProps} submitting asyncValidating={false} />
  );

  expect(wrapper).toMatchSnapshot();
});
