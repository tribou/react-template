// @flow
import React from 'react'
import { IndexRoute, Route } from 'react-router'

import App from './components/App.index'
import Home from './components/Home/Home.index'
import NotFound from './components/NotFound/NotFound.index'
import Profile from './components/Profile/Profile.index'
import Todos from './components/Todos/Todos.index'


const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="profile" component={Profile} />
    <Route path="todos" component={Todos} />
    <Route path="*" component={NotFound} />
  </Route>
)


export default routes
