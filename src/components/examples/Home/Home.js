// @flow
import React from 'react'
import { Link } from 'react-router'

import img from 'src/styles/images.css'
import sprites from 'src/styles/sprites.css'
import css from './Home.style.css'


const Home = (): React$Element<any> => {

  return (
    <div className={css.home}>
      This is the app...
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
