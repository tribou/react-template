// @flow
import devToolsEnhancer from "remote-redux-devtools";

const { NODE_ENV } = process.env;

const devtools =
  NODE_ENV === "development"
    ? () =>
        devToolsEnhancer({
          name: "React Native",
          maxAge: 100
        })
    : () => {};

export default devtools;
