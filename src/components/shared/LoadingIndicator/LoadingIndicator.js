// @flow
import React, { PureComponent } from 'react'
import css from './LoadingIndicator.style.css'

import type { ReduxProps } from './LoadingIndicator.index'


type Props = ReduxProps & {
}

class LoadingIndicator extends PureComponent<void, Props, void> {

  render () {

    const { weAreLoading } = this.props

    if (!weAreLoading) return null

    return (
      <div className={css.loading}>
        Loading...
      </div>
    )

  }

}


export default LoadingIndicator
