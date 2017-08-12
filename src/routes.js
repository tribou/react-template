// @flow
import React from 'react'
import { Route, Redirect, Switch } from 'react-router'

import App from 'src/components/App.index'
import NotFound from 'src/components/NotFound/NotFound.index'

// Examples
import Home from 'src/components/examples/Home/Home.index'
import Profile from 'src/components/examples/Profile/Profile.index'
import Todos from 'src/components/examples/Todos/Todos.index'


const Routes = () => (
  <App>
    <Switch>

      {/* Example Routes */}
      <Route exact path="/home" component={Home} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/todos" component={Todos} />
      <Redirect exact from="/" to="/home" />

      {/* 404 */}
      <Route component={NotFound} />

    </Switch>
  </App>
)


export default Routes
