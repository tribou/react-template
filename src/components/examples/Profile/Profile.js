// @flow
import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'
import { getAuthToken, requireAuth } from 'src/helpers/auth'
import css from './Profile.style.css'

import type { ReduxProps } from './Profile.index'

type Props = ReduxProps & {
  location: Object,
  history: Object,
}


class Profile extends PureComponent<void, Props, void> {

  componentWillMount () {

    const { location, history } = this.props
    requireAuth(getAuthToken, location, history)

  }

  componentDidMount () {

    this.props.fetchProfile()

  }

  render () {

    const { error, me } = this.props

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
