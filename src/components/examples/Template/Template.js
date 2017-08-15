// @flow
import React, { PureComponent } from 'react'
import css from './Template.style.css'

import type { ReduxProps } from './Template.index'


type Props = ReduxProps & {
}

class Template extends PureComponent<void, Props, void> {

  render () {

    const { url } = this.props

    return (
      <div className={css.template}>
        {url}
      </div>
    )

  }

}

export default Template
