// @flow
import React from 'react'
import { Link } from 'react-router'
import css from './Home.style.css'

import img from '../../styles/images.css'
import sprites from '../../styles/sprites.css'


const Home = (): React$Element<any> => {

  return (
    <div className={`${css.home} flex flex-column justify-center items-center pt7 tc`}>
      This is the offline app...
      <ul>
        <li>This is a test item</li>
      </ul>
      <Link to="/profile">
        <div className={img.logo} />
      </Link>
      <div className="pt2">
        <div className={sprites.facebookIcon} />
      </div>
    </div>
  )

}


export default Home
