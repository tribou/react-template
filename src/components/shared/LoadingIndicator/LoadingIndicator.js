// @flow
import React, { PureComponent } from "react";
import css from "./LoadingIndicator.style.css";

import type { ReduxProps } from "./";

type Props = ReduxProps & {};

class LoadingIndicator extends PureComponent<Props> {
  render() {
    const { weAreLoading } = this.props;

    if (!weAreLoading) return null;

    return <div className={css.loading}>Loading...</div>;
  }
}

export default LoadingIndicator;
