// @flow
import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import css from './Todos.style.css'

import type { ReduxProps } from './Todos.index'


type Props = ReduxProps


class Todos extends PureComponent {

  componentDidMount () {

    this.props.getTodos()

  }

  props: Props

  render (): React$Element<any> {

    const { setFilterCurrent, setFilterDone, todos } = this.props

    const todoList = todos.map((todo) => {

      return <li key={todo.get('text')}>{todo.get('text')}</li>

    })

    return (
      <div className={css.todos}>
        <div className={css.modal}>
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
