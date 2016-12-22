// @flow
import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import css from './Todos.style.css'

import type { ReduxProps } from './Todos.index'


type Props = ReduxProps


class Todos extends PureComponent {

  props: Props

  handleFilterDoneClick = () => {

    this.props.setFilterDone()

  }

  handleFilterCurrentClick = () => {

    this.props.setFilterCurrent()

  }

  render (): React$Element<any> {

    const { todos } = this.props

    const todoList = todos.map((todo, index) => {

      return <li key={index}>{todo.get('text')}</li>

    })

    return (
      <div className={`${css.todos} pt6 tc`}>
        <div className={css.modal}>
          Todos page
          <ul>
            {todoList}
          </ul>
          <Link to="/home">Back</Link>
          <button
            onClick={this.handleFilterDoneClick}
          >
            Filter Done
          </button>
          <button
            onClick={this.handleFilterCurrentClick}
          >
            Filter Current
          </button>
        </div>
      </div>
    )

  }

}


export default Todos
