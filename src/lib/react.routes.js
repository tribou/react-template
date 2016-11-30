// @flow
import React from 'react'
import { IndexRoute, Route } from 'react-router'
import Root from '../components/Root/Root.container'
import NotFound from '../components/NotFound/NotFound'

const routes = (
  <Route path="/">
    <IndexRoute component={Root} />
    <Route path="*" component={NotFound} />
  </Route>
)

export default routes
