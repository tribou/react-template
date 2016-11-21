// @flow
import React from 'react'
import { Route } from 'react-router'
import App from '../components/App'
// import Walkie from './components/Walkie.js'

const routes = (
  <Route path="/" component={App}>
    {/*
      <IndexRedirect to='/walkie' />
      <Route path='walkie' component={Walkie} />
    */}
  </Route>
)

export default routes
