// @flow
import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import Cn from 'classnames'

import img from 'src/styles/images.css'
import sprites from 'src/styles/sprites.css'
import css from './Home.style.css'
import type { ReduxProps } from './Home.index'

type ReactProps = {
  history: Object,
}

type Props = ReduxProps & ReactProps

class Home extends PureComponent {

  constructor (props: Props) {

    super(props)
    this.handleLogout = this.handleLogout.bind(this)

  }

  props: Props
  handleLogout: Function

  handleLogout () {

    const {
      logout,
      history,
    } = this.props

    logout().then(() => {

      history.push({
        pathname: '/home',
      })

    })

  }

  render (): React$Element<any> {


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
