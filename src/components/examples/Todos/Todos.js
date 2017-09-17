// @flow
import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import css from './Todos.style.css'

import type { ReduxProps } from './'


type Props = ReduxProps


class Todos extends PureComponent<Props> {

  componentDidMount () {

    this.props.getTodos()

  }

  // TODO: watch for resolution of
  // https://github.com/yannickcr/eslint-plugin-react/issues/1376
  props: Props

  render () {

    const { setFilterCurrent, setFilterDone, todos } = this.props

    const todoList = todos.map(todo =>
      <li key={todo.text}>{todo.text}</li>
    )

    return (
      <div className={css.todos}>
        <Helmet title="Todos" />
        <div className={css.content}>
          Todos page
          <ul>
            {todoList}
          </ul>
          <Link to="/home">Back</Link>
          <button
            onClick={setFilterDone}
          >
            Filter Done
          </button>
          <button
            onClick={setFilterCurrent}
          >
            Filter Current
          </button>
        </div>
      </div>
    )

  }

}


export default Todos
