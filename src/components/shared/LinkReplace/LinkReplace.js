// @flow
import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import history from 'src/helpers/history'

type ReactProps = {
  to: Object,
  className: any,
  children: React$Element<any> | string,
}

type Props = ReactProps

class LinkReplace extends PureComponent {

  handleClick = () => {

    if (this.props.to.state && this.props.to.query) {

      history.replace({
        pathname: this.props.to.pathname,
        state: this.props.to.state,
        query: this.props.to.query,
      })

    }

    else if (this.props.to.state) {

      history.replace({
        pathname: this.props.to.pathname,
        state: this.props.to.state,
      })

    }

    else if (this.props.to.query) {

      history.replace({
        pathname: this.props.to.pathname,
        query: this.props.to.query,
      })

    }

    else {

      history.replace({
        pathname: this.props.to,
        state: { modal: '' },
      })

    }

  }

  props: Props

  render (): React$Element<any> {

    return (
      <Link
        className={this.props.className}
        onClick={this.handleClick}
      >
        {this.props.children}
      </Link>
    )


  }
}

export default LinkReplace
