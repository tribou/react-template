// @flow
import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'
import { getAuthToken, requireAuth } from 'src/helpers/auth'
import css from './Profile.style.css'

import type { ReduxProps } from './Profile.index'

type ReactProps = {
  location: Object,
  history: Object,
}

type Props = ReduxProps & ReactProps


class Profile extends PureComponent {

  componentWillMount () {

    const { location, history } = this.props
    requireAuth(getAuthToken, location, history)

  }

  componentDidMount () {

    this.props.fetchProfile()

  }

  props: Props


  render (): React$Element<any> {

    const { error, me } = this.props

    return (
      <div className={css.profile}>
        <Helmet title="Profile" />
        <div className={css.content}>
          Profile page
          <ul>
            <li>{me.get('firstName')}</li>
            <li>{me.get('lastName')}</li>
            <li>{me.get('city')}</li>
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
