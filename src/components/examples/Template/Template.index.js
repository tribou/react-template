// @flow
import { connect } from 'react-redux'
import type { RootReducerState } from 'src/redux/modules'
import Template from './Template'


type StateProps = {
  url: string,
}

const mapStateToProps = (
  { env: { ROOT_URL } }: RootReducerState
): StateProps => ({ url: ROOT_URL })


type DispatchProps = {
}

const mapDispatchToProps = (dispatch: GlobalDispatch<*>): DispatchProps => ({})


export default connect(mapStateToProps, mapDispatchToProps)(Template)
export type ReduxProps = StateProps & DispatchProps
