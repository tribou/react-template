// @flow
import { connect } from 'react-redux'
import type { RootReducerState } from 'src/redux/modules'
import Template from './Template'


type StateProps = {
  url: string,
}

function mapStateToProps (state: RootReducerState): StateProps {

  const { env: { ROOT_URL } } = state
  return {
    url: ROOT_URL,
  }

}

type DispatchProps = {
}

function mapDispatchToProps (dispatch: any): DispatchProps {

  return {}

}


export default connect(mapStateToProps, mapDispatchToProps)(Template)
export type ReduxProps = StateProps & DispatchProps
