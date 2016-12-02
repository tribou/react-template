// @flow
import React from 'react'
import { Link } from 'react-router'
import css from './NotFound.style.css'


const NotFound = (): React$Element<any> => {

  return (
    <div className={css.notFound}>
      <h2>
        The page you are looking for was not found.
      </h2>
      <p>
        ( Hint: try <Link to={'/'}> this one.</Link> ;-)
      </p>
    </div>
  )

}


export default NotFound
