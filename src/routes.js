// @flow
import React from 'react'
import { Route } from 'react-router'

import App from './components/App.index'
import NotFound from './components/NotFound/NotFound.index'

// Examples
import Home from './components/examples/Home/Home.index'
import Profile from './components/examples/Profile/Profile.index'
import Todos from './components/examples/Todos/Todos.index'


const routes = (
  <Route path="/" component={App}>
    {/*
      <IndexRoute component={Home} />
    */}

    {/* Examples */}
    <Route path="home" component={Home} />
    <Route path="profile" component={Profile} />
    <Route path="todos" component={Todos} />

    {/* 404 */}
    <Route path="*" component={NotFound} />
  </Route>
)


export default routes
