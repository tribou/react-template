// @flow
import React from 'react'
import Root from '../containers/Root'


const App = (props: { children: any }): Function => {

  return (
    <Root>
      <div
        className="pt7 tc"
      >
        This is the app.
        {props.children}
      </div>
    </Root>
  )

}


export default App
