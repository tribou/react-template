// @flow
import React, { PureComponent } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'
import css from './Profile.style.css'

import type { ReduxProps } from './Profile.index'

type Props = ReduxProps & {
  history: Object,
  location: Object,
}


class Profile extends PureComponent<void, Props, void> {

  componentDidMount () {

    this.props.fetchProfile()

  }

  render () {

    const { error, me, token, location } = this.props
    const { hash, pathname, search } = location
    const redirect = `${pathname}${search}${hash}`

    if (!token) return <Redirect to={`/home?login=true&redirect=${encodeURIComponent(redirect)}`} />

    return (
      <div className={css.profile}>
        <Helmet title="Profile" />
        <div className={css.content}>
          Profile page
          <ul>
            <li>{me.firstName}</li>
            <li>{me.lastName}</li>
            <li>{me.city}</li>
          </ul>
          <Link to="/home">Back</Link>
          <button
            onClick={this.props.fetchProfile}
          >
            Refresh
          </button>
          <div className={css.error}>
            {error}
          </div>
        </div>
      </div>
    )

  }

}


export default Profile
