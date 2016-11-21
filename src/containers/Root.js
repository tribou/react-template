// @flow
import { Component } from 'react'
import { connect } from 'react-redux'
import { loadSuccess } from '../actions/init'

type Props = {
  children: any,
  dispatch: Function,
}


class Root extends Component {

  componentDidMount () {

    const { dispatch } = this.props
    this.timeout = setTimeout(() => {

      dispatch(loadSuccess())

    }, 500)

    // Can replace with API call checks in the future:
    // {
    //   loadedChannels: true,
    //   loadedMessages: true,
    // }

  }

  componentWillUnmount () {

    clearTimeout(this.timeout)

  }

  props: Props
  timeout: number

  render (): ?React$Element<any> {

    if (this.props.children) return this.props.children
    return null

  }

}


function mapStateToProps (state: GlobalReducerState): Object {

  const { init } = state

  return {
    init,
  }

}


export default connect(mapStateToProps)(Root)
