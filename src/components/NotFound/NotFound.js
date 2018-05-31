// @flow
import React, { PureComponent } from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Status from "src/components/shared/Status";
import css from "./NotFound.style.css";

class NotFound extends PureComponent<void> {
  render() {
    return (
      <Status code={404}>
        <div className={css.notFound}>
          <Helmet title="Oops!" />
          <h2>The page you are looking for was not found.</h2>
          <p>
            ( Hint: try <Link to="/"> this one.</Link> ;-)
          </p>
        </div>
      </Status>
    );
  }
}

export default NotFound;
