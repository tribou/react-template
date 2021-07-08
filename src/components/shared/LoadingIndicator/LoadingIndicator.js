// @flow
import React, { PureComponent } from "react";
import css from "./LoadingIndicator.style.css";

import type { ContainerProps } from "./";

type Props = ContainerProps & {};

class LoadingIndicator extends PureComponent<Props> {
  render() {
    const { weAreLoading } = this.props;

    if (!weAreLoading) return null;

    return <div className={css.loading}>Loading...</div>;
  }
}

export default LoadingIndicator;
