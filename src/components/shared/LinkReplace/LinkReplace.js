// @flow
import React, { PureComponent } from 'react'

type ReactProps = {
  history: Object,
  to: Object,
  className: any,
  children: React$Element<any> | string,
}

type Props = ReactProps

class LinkReplace extends PureComponent {

  handleClick = () => {

    const {
      history,
      to,
    } = this.props

    if (to.state && to.query) {

      history.replace({
        pathname: to.pathname,
        state: to.state,
        query: to.query,
      })

    }

    else if (to.state) {

      history.replace({
        pathname: to.pathname,
        state: to.state,
      })

    }

    else if (to.query) {

      history.replace({
        pathname: to.pathname,
        query: to.query,
      })

    }

    else {

      history.replace({
        pathname: to,
        state: { modal: '' },
      })

    }

  }

  props: Props

  render (): React$Element<any> {

    return (
      <div
        role="button"
        tabIndex={-1}
        className={this.props.className}
        onClick={this.handleClick}
      >
        {this.props.children}
      </div>
    )


  }
}

export default LinkReplace
