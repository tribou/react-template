// @flow
import React from 'react'
import css from './LoadingIndicator.style.css'

import { IReduxProps } from './LoadingIndicator.index'


const LoadingIndicator = (props: IReduxProps) => {

  const { weAreLoading } = props

  if (!weAreLoading) return null

  return (
    <div className={css.loading}>
      Loading...
    </div>
  )

}


export default LoadingIndicator
