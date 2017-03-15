// @flow
import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import css from './Profile.style.css'

import type { ReduxProps } from './Profile.index'


type Props = ReduxProps


class Profile extends PureComponent {

  componentDidMount () {

    this.props.fetchProfile()

  }

  props: Props


  render (): React$Element<any> {

    const { error, me } = this.props

    return (
      <div className={css.profile}>
        <div className={css.modal}>
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
