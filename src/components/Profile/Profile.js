// @flow
import React from 'react'
import { Link } from 'react-router'
import css from './Profile.style.css'


import type { ReduxProps } from './Profile.index'

type Props = ReduxProps


const Profile = (props: Props): React$Element<any> => {

  const { me } = props

  return (
    <div className={`${css.profile} pt7 tc`}>
      Profile page
      <ul>
        <li>{ me.get('city') }</li>
      </ul>
      <Link to="/">Back</Link>
    </div>
  )

}


export default Profile
