// @flow
import React, { PureComponent } from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Cn from "classnames";

import RequireAuth from "src/components/shared/RequireAuth";
import img from "src/styles/images.css";
import sprites from "src/styles/sprites.css";
import css from "./Home.style.css";
import type { ReduxProps } from "./";

type Props = ReduxProps & {
  history: Object
};

class Home extends PureComponent<Props> {
  // TODO: watch for resolution of
  // https://github.com/yannickcr/eslint-plugin-react/issues/1376
  props: Props;

  handleLogout = () => {
    const { logout, history } = this.props;

    logout(history);
  };

  render() {
    return (
      <div className={css.home}>
        <Helmet title="Home" />
        This is the app...
        <ul>
          <li>This is a test item</li>
        </ul>
        <Link to="/profile">
          <div className={Cn(img.logo, css.link)} />
        </Link>
        <Link to="/todos">
          <div className={Cn(sprites.facebookIcon, css.link)} />
        </Link>
        <RequireAuth>
          <button onClick={this.handleLogout}>Logout</button>
        </RequireAuth>
      </div>
    );
  }
}

export default Home;
