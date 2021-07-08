// @flow
import React from "react";
import css from "./Template.style.css";

import type { ContainerProps } from "./";

type Props = ContainerProps & {};
type State = {};

// For performance optimization, PureComponent is better than stateless
export default class Template extends React.PureComponent<Props, State> {
  render() {
    return (
      <div className={css.template}>
        This is the test: <br />
        Test
      </div>
    );
  }
}
