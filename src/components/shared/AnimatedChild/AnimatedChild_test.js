// @flow

// Enzyme docs:
// http://airbnb.io/enzyme/docs/api/index.html

import React from "react";
import { shallow } from "enzyme";
import AnimatedChild from "./AnimatedChild";

const mockProps = {
  children: <div />
};

it("<AnimatedChild> renders the AnimatedChild content", () => {
  const wrapper = shallow(<AnimatedChild {...mockProps} />);

  expect(wrapper).toMatchSnapshot();
});
