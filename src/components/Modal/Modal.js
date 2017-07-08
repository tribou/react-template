// @flow
import React from 'react'
import { isBrowser } from 'config/env'
import { parse } from 'qs'
import Login from './Login/Login.index'
import css from './Modal.style.css'

type Props = {
  location: Object,
}

const getStateModal = (props: Props): ?React$Element<any> => {

  const { location } = props

  // Client-only routes
  if (!(location.state && location.state.modal)) return null

  switch (location.state.modal) {

    // case 'reset-password-confirmation':
      //   return <ResetPasswordConfirmation {...props} />

    default:
      return null
  }

}

const getQueryModal = (props: Props): ?React$Element<any> => {

  const { location } = props

  let query = {}
  if (location.search && location.search.length > 0) {

    query = parse(location.search.substr(1))

  }

  if (query.login) {

    return <Login {...props} />

  }

  // else if (query['reset-password']) {

  //   return <ResetPassword {...props} />

  // }

  // else if (query['recover-password']) {

  //   return <RecoverPassword {...props} />

  // }

  return null

}

const Modal = (props: Props): ?React$Element<any> => {

  const stateModal = getStateModal(props)
  const queryModal = getQueryModal(props)

  if (!stateModal && !queryModal) {

    // TODO: side effect in stateless component...
    // quick fix to prevent scrolling
    if (isBrowser()
      && document
      && document.body
      && document.body.style) document.body.style.overflow = 'visible'
    return null

  }

  // TODO: side effect in stateless component...
  // quick fix to prevent scrolling
  if (isBrowser()
      && document
      && document.body
      && document.body.style) document.body.style.overflow = 'hidden'
  return (
    <div className={css.modal}>
      { getStateModal(props) }
      { getQueryModal(props) }
    </div>
  )

}

export default Modal
