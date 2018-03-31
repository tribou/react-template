// @flow

// Enzyme docs:
// http://airbnb.io/enzyme/docs/api/index.html

import React from "react";
import { shallow } from "enzyme";
import LinkReplace from "./LinkReplace";

const mockProps = {
  className: "overriding-class",
  children: "Link Text",
  history: {
    push: jest.fn(),
    replace: jest.fn()
  },
  location: { pathname: "/" },
  staticContext: {},
  match: {}
};

it("<LinkReplace> renders the LinkReplace component", () => {
  const wrapper = shallow(
    <LinkReplace
      {...mockProps}
      to={{
        pathname: "location_string",
        state: { modal: "create-offer-intro" }
      }}
    >
      <button />
    </LinkReplace>
  );

  expect(wrapper).toMatchSnapshot();
});
