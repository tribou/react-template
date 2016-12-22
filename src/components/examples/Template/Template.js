// @flow
import React from 'react'
import css from './Template.style.css'
import type { ReduxProps } from './Template.index'


type Props = ReduxProps

const Template = (props: Props): React$Element<any> => {

  return (
    <div className={css.template}>
      Template
    </div>
  )

}


export default Template
