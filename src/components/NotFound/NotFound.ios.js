// @flow
import Debug from 'debug'
import React, { PureComponent } from 'react'
import { Redirect } from 'react-router'

const log = Debug('my-app:components:NotFound')


class NotFound extends PureComponent<void> {

  render () {

    log('Route not found. Redirecting to /')
    return (
      <Redirect to="/" />
    )

  }

}


export default NotFound
