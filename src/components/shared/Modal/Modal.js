// @flow
import React, { PureComponent } from 'react'
import get from 'lodash/get'
import { isBrowser } from 'config/env'
import { parse } from 'qs'
import Login from './Login/Login.index'
import css from './Modal.style.css'

type Props = any

const getQuery = search => (
  typeof search === 'string'
    ? parse(search.substr(1))
    : undefined
)

const Modal = (props: Props) => {

  const search = get(props, 'location.search')
  const modal = get(props, 'location.state.modal') || get(getQuery(search), 'm')
  if (!modal) return null

  const modals = {
    login: <Login {...props} />,
    // 'reset-password': <ResetPassword {...props} />,
    // 'recover-password': <RecoverPassword {...props} />,
    default: null,
  }

  return (
    <div className={css.modal}>
      {modals[modal] || modal.default}
    </div>
  )

}

class ModalWrapper extends PureComponent<Props> {

  componentDidMount () {

    // TODO: side effect in stateless component...
    // quick fix to prevent scrolling
    const style = get(document, 'body.style')
    if (isBrowser() && style) style.overflow = 'hidden'

  }

  componentWillUnmount () {

    // TODO: side effect in stateless component...
    // quick fix to prevent scrolling
    const style = get(document, 'body.style')
    if (isBrowser() && style) style.overflow = 'visible'

  }

  // TODO: watch for resolution of
  // https://github.com/yannickcr/eslint-plugin-react/issues/1376
  props: Props

  render () {

    return <Modal {...this.props} />

  }

}

export default ModalWrapper
