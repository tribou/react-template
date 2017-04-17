// @flow
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { login } from 'src/redux/modules/auth'
import Login from './Login'

const validate = (values) => {

  const errors = {}
  const requiredFields = [
    'usernameInput',
    'passwordInput',
  ]
  requiredFields.forEach((field) => {

    if (!values[field]) {

      errors[field] = 'Required'

    }

  })
  return errors

}

const onSubmit = (values, dispatch, props): Promise<*> => {

  const { usernameInput, passwordInput } = values
  const { redirect } = props.location.query

  return login({
    username: usernameInput,
    password: passwordInput,
    redirect,
  })(dispatch)

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


export default connect(mapStateToProps)(
  reduxForm(reduxFormConfig)(Login)
)
export type ReduxProps = StateProps
