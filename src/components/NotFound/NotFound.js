// @flow
import React from 'react'
import { Link } from 'react-router'


const NotFound = (): React$Element<any> => {

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h2>
        The page you are looking for was not found.
      </h2>
      <h4>
        ( Hint: try
        <Link to={'/'}>
          &nbsp;this one.
        </Link>
        &nbsp; ;-)
      </h4>
    </div>
  )

}


export default NotFound
