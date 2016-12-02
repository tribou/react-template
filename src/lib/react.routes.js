// @flow
import React from 'react'
import { IndexRoute, Route } from 'react-router'

import App from '../components/App.index'
import Root from '../components/Root/Root.index'
import NotFound from '../components/NotFound/NotFound.index'


const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Root} />
    <Route path="*" component={NotFound} />
  </Route>
)


export default routes
