// @flow
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { withRouter } from 'react-router'
import { parse } from 'qs'
import { login } from 'src/redux/modules/auth'
import Login from './Login'

const validate = values => {

  const errors = {}
  const requiredFields = [
    'usernameInput',
    'passwordInput',
  ]
  requiredFields.forEach(field => {

    if (!values[field]) errors[field] = 'Required'

  })
  return errors

}

const onSubmit = (values, dispatch, props): Promise<*> => {

  const { usernameInput, passwordInput } = values
  const search = parse(props.location.search.substr(1))

  return login({
    username: usernameInput,
    password: passwordInput,
    redirect: search.redirect,
  }, props.history)(dispatch)

}

const reduxFormConfig = {
  form: 'loginModalForm',
  initialValues: {
    // TODO: remove these
    usernameInput: 'test@example.com',
    passwordInput: 'secret',
  },
  validate,
  onSubmit,
}


type StateProps = {
  error: string,
}

function mapStateToProps (state: GlobalReducerState): StateProps {

  const { error } = state.auth

  return {
    error,
  }

}


export default withRouter(connect(mapStateToProps)(
  reduxForm(reduxFormConfig)(Login)
))
export type ReduxProps = StateProps
