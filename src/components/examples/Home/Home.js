// @flow
import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import Cn from 'classnames'

import img from 'src/styles/images.css'
import sprites from 'src/styles/sprites.css'
import css from './Home.style.css'
import type { ReduxProps } from './Home.index'

type Props = ReduxProps & {
  history: Object,
}

class Home extends PureComponent<void, Props, void> {

  handleLogout = () => {

    const {
      logout,
      history,
    } = this.props

    logout(history)

  }

  render () {


    const logoutButton = this.props.authenticated
      ? (
        <button onClick={this.handleLogout}>Logout</button>
      )
      : null

    return (
      <div className={css.home}>
        <Helmet title="Home" />
        This is the app...
        <ul>
          <li>This is a test item</li>
        </ul>
        <Link to="/profile">
          <div className={Cn(img.logo, css.link)} />
        </Link>
        <Link to="/todos">
          <div className={Cn(sprites.facebookIcon, css.link)} />
        </Link>
        {logoutButton}
      </div>
    )

  }

}


export default Home
