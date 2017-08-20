// @flow
import React, { PureComponent } from 'react'
import { Redirect } from 'react-router'
import type { Location } from 'react-router'

import type { ReduxProps } from './RequireAuth.index'


type Props = ReduxProps & {
  children?: React$Element<*>,
  location: Location,
  to?: string,
}

class RequireAuth extends PureComponent<Props> {

  // TODO: watch for resolution of
  // https://github.com/yannickcr/eslint-plugin-react/issues/1376
  props: Props

  render () {

    const { children, location, to, token } = this.props
    const { hash, pathname, search } = location
    const redirect = encodeURIComponent(`${pathname}${search}${hash}`)

    const t = to || `/home?m=login&redirect=${redirect}`

    if (!token && !children) return <Redirect to={t} />
    if (!token && children) return null

    return children || null

  }

}

export default RequireAuth
