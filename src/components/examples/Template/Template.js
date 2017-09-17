// @flow
import React, { PureComponent } from 'react'
import css from './Template.style.css'

import type { ReduxProps } from './'


type Props = ReduxProps & {
}

class Template extends PureComponent<Props> {

  // TODO: watch for resolution of
  // https://github.com/yannickcr/eslint-plugin-react/issues/1376
  props: Props

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
