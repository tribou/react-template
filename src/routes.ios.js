// @flow
import React from "react";
import { Route, Redirect } from "react-router";
import Stack from "react-router-native-stack";

import App from "src/components";

// Examples
import Home from "src/components/routes/examples/Home";
import Profile from "src/components/routes/examples/Profile";
import Todos from "src/components/routes/examples/Todos";

const Routes = () => (
  <App>
    <Stack animationType="slide-horizontal">
      {/* Example Routes */}
      <Route exact path="/home" component={Home} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/todos" component={Todos} />
      <Redirect exact from="/" to="/home" />
    </Stack>
  </App>
);

export default Routes;
