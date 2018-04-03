// @flow

// Enzyme docs:
// http://airbnb.io/enzyme/docs/api/index.html

import React from "react";
import { render, shallow } from "enzyme";
import { StaticRouter } from "react-router";
import Status from "./Status";

const mockProps = {
  code: 404
};

it("<Status> renders the Status content", () => {
  const wrapper = shallow(
    <Status {...mockProps}>
      <div />
    </Status>
  );

  expect(wrapper).toMatchSnapshot();
});

it("<Status> sets the code context", () => {
  const context = {};
  render(
    <StaticRouter context={context}>
      <Status {...mockProps} code={401}>
        <div />
      </Status>
    </StaticRouter>
  );

  expect(context.code).toEqual(401);
});
