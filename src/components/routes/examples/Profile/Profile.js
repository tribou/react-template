// @flow
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import RequireAuth from "src/components/shared/RequireAuth";
import css from "./Profile.style.css";

import type { ContainerProps } from "./";

type Props = ContainerProps & {
  history: Object
};

class Profile extends PureComponent<Props> {
  componentDidMount() {
    // Normally, this would fetch the same profile each time (and be
    // idempotent). For the random user API, we need to emulate browsing back
    // to the same profile.
    if (!this.props.me.firstName) this.props.fetchProfile();
  }

  render() {
    const { error, me } = this.props;

    return (
      <div className={css.profile}>
        <Helmet title="Profile" />
        <RequireAuth />
        <div className={css.content}>
          Profile page
          <ul>
            <li>{me.firstName}</li>
            <li>{me.lastName}</li>
            <li>{me.city}</li>
          </ul>
          <Link to="/home">Back</Link>
          <button onClick={this.props.fetchProfile}>Refresh</button>
          <div className={css.error}>{error}</div>
        </div>
      </div>
    );
  }
}

export default Profile;
