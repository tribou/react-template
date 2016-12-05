// @flow
import React from 'react'
import css from './Home.style.css'

import img from '../../styles/images.css'


type Props = {
}


const Home = (props: Props): React$Element<any> => {

  return (
    <div className={`${css.home} pt7 tc`}>
      This is the offline app...
      <ul>
        <li>This is a test item</li>
      </ul>
      <div className={img.logo} />
    </div>
  )

}


export default Home
