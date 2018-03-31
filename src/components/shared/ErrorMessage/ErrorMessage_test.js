// @flow

// Enzyme docs:
// http://airbnb.io/enzyme/docs/api/index.html

import React from "react";
import { shallow } from "enzyme";
import ErrorMessage from "./ErrorMessage";

const mockProps = {
  error: { message: "This is the error" }
};

it("<ErrorMessage> renders the ErrorMessage content", () => {
  const wrapper = shallow(<ErrorMessage {...mockProps} />);

  expect(wrapper).toMatchSnapshot();
});
