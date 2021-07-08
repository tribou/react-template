// @flow
import React from "react";
import Snackbar from "material-ui/Snackbar";

import type { ContainerProps } from "./";

const autoHideDuration = 10000;

type Props = ContainerProps & {};

const ErrorMessage = (props: Props) => {
  const { error } = props;

  if (!error) return null;

  return (
    <Snackbar
      open
      message={error.message}
      autoHideDuration={autoHideDuration}
    />
  );
};

export default ErrorMessage;
