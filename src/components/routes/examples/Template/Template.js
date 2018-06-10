// @flow
import React from "react";
import css from "./Template.style.css";

import type { ReduxProps } from "./";

type Props = ReduxProps & {};
type State = {};

// For performance optimization, PureComponent is better than stateless
export default class Template extends React.PureComponent<Props, State> {
  render() {
    const { url } = this.props;

    return (
      <div className={css.template}>
        This is the url: <br />
        {url}
      </div>
    );
  }
}
