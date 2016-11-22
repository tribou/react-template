// @flow
import React from 'react'
import Root from '../containers/Root'


const App = (props: { children: any }): React$Element<any> => {

  return (
    <Root>
      <div
        className="pt7 tc"
      >
        This is the offline app.
        {props.children}
      </div>
    </Root>
  )

}


export default App
