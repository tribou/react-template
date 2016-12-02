// @flow
import React from 'react'
import { IndexRoute, Route } from 'react-router'

import App from '../components/App.index'
import Home from '../components/Home/Home.index'
import NotFound from '../components/NotFound/NotFound.index'

import Profile from '../components/Profile/Profile.index'


const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="profile" component={Profile} />
    <Route path="*" component={NotFound} />
  </Route>
)


export default routes
