// @flow
import React from 'react'
import { IndexRedirect, Route } from 'react-router'

import App from 'src/components/App.index'
import NotFound from 'src/components/NotFound/NotFound.index'

// Examples
import Home from 'src/components/examples/Home/Home.index'
import Profile from 'src/components/examples/Profile/Profile.index'
import Todos from 'src/components/examples/Todos/Todos.index'

import type { requireAuth as $requireAuth } from 'src/helpers/auth'


const getRoutes = (requireAuth: $requireAuth) => {

  return (
    <Route path="/" component={App}>

      {/* Examples */}
      <IndexRedirect to="/home" />
      <Route path="home" component={Home} />
      <Route path="profile" onEnter={requireAuth} component={Profile} />
      <Route path="todos" onEnter={requireAuth} component={Todos} />

      {/* 404 */}
      <Route path="*" component={NotFound} />
    </Route>
  )

}


export default getRoutes
