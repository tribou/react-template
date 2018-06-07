// @flow
import React from "react";
import { shallow } from "enzyme";
import Home from "./Home.ios";

type OverrideProps = {
  logout: Function,
  history: Object
};

const mockProps: OverrideProps = {
  logout: () => {},
  history: {
    replace: () => {}
  }
};

it("renders successfully", () => {
  const wrapper = shallow(<Home {...mockProps} />);

  expect(wrapper).toMatchSnapshot();
});
