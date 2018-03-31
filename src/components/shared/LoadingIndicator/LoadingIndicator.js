// @flow
import React, { PureComponent } from "react";
import css from "./LoadingIndicator.style.css";

import type { ReduxProps } from "./";

type Props = ReduxProps & {};

class LoadingIndicator extends PureComponent<Props> {
  // TODO: watch for resolution of
  // https://github.com/yannickcr/eslint-plugin-react/issues/1376
  props: Props;

  render() {
    const { weAreLoading } = this.props;

    if (!weAreLoading) return null;

    return <div className={css.loading}>Loading...</div>;
  }
}

export default LoadingIndicator;
