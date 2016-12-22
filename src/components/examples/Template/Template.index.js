// @flow
import { connect } from 'react-redux'
import Template from './Template'


type StateProps = {
  API_URL: string,
}

function mapStateToProps (state: GlobalReducerState): StateProps {

  const { API_URL } = state.env

  return {
    API_URL,
  }

}


export default connect(mapStateToProps)(Template)
export type ReduxProps = StateProps
