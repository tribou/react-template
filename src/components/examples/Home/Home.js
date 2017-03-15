// @flow
import React from 'react'
import { Link } from 'react-router'
import css from './Home.style.css'

import img from '../../../styles/images.css'
import sprites from '../../../styles/sprites.css'


const Home = (): React$Element<any> => {

  return (
    <div className={css.home}>
      This is an offline app...
      <ul>
        <li>This is a test item</li>
      </ul>
      <Link to="/profile">
        <div className={img.logo} />
      </Link>
      <Link to="/todos">
        <div className={sprites.facebookIcon} />
      </Link>
    </div>
  )

}


export default Home
