// @flow
import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import css from './Profile.style.css'

import type { ReduxProps } from './Profile.index'


type Props = ReduxProps


class Profile extends PureComponent {

  props: Props

  handleRefreshClick = () => {

    this.props.fetchProfile(this.props.API_URL)

  }

  render (): React$Element<any> {

    const { me } = this.props

    return (
      <div className={`${css.profile} pt7 tc`}>
        <div className={css.modal}>
          Profile page
          <ul>
            <li>{me.get('firstName')}</li>
            <li>{me.get('lastName')}</li>
            <li>{me.get('city')}</li>
          </ul>
          <Link to="/">Back</Link>
          <button
            onClick={this.handleRefreshClick}
          >
            Refresh
          </button>
        </div>
      </div>
    )

  }

}


export default Profile
