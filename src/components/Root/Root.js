// @flow
import React from 'react'
import css from './Root.style.css'


const Root = (props: { children: any }): React$Element<any> => {

  return (
    <div className={`${css.root} pt7 tc`}>
      This is the offline app...
      {props.children}
      <ul>
        <li>This is a test item</li>
      </ul>
    </div>
  )

}


export default Root
