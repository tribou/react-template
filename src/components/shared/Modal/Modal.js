// @flow
import React, { PureComponent } from "react";
import get from "lodash/get";
import { isBrowser } from "config/env";
import { parse } from "qs";
import Login from "./Login/Login.index";
import css from "./Modal.style.css";

type Props = any;

class Modal extends PureComponent<Props> {
  static getQuery = (search: any) =>
    typeof search === "string" ? parse(search.substr(1)) : undefined;

  getModal = () => {
    const search = get(this.props, "location.search");
    const modal = get(
      this.props,
      "location.state.modal",
      get(Modal.getQuery(search), "m", "default")
    );

    // Define modals here
    const modals = {
      login: <Login {...this.props} />,
      // 'reset-password': <ResetPassword {...props} />,
      // 'recover-password': <RecoverPassword {...props} />,
      default: null
    };

    return modals[modal];
  };

  render() {
    const modal = this.getModal();

    // Side-effect for web
    const style =
      typeof document !== "undefined" ? get(document, "body.style") : undefined;

    if (
      !modal &&
      isBrowser() &&
      style &&
      style.overflow &&
      style.overflow === "hidden"
    ) {
      style.overflow = "visible";
      return null;
    }

    if (isBrowser() && style) style.overflow = "hidden";

    return modal ? <div className={css.modal}>{modal}</div> : null;
  }
}

export default Modal;
