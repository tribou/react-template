// @flow
import React, { PureComponent } from 'react'

type ReactProps = {
  location: Object,
  history: Object,
  match: Object,
  staticContext: ?Object,
  to: Object,
  className: any,
  children: React$Element<any> | string,
}

type Props = ReactProps

class LinkReplace extends PureComponent<Props> {

  // TODO: watch for resolution of
  // https://github.com/yannickcr/eslint-plugin-react/issues/1376
  props: Props

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

  render () {

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
