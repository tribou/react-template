// @flow
import React from 'react'
import { IndexRoute, Route } from 'react-router'
import App from '../components/App'
import NotFound from '../components/NotFound/NotFound'

const routes = (
  <Route path="/">
    <IndexRoute component={App} />
    <Route path="*" component={NotFound} />
  </Route>
)

export default routes
