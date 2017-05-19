// @flow
import React, { PureComponent } from 'react'
import MuiTextField from 'material-ui/TextField'
import vars from 'config/variables'


type Props = {
  input: Object,
  style: Object,
  label: string,
  meta: Object,
  customStyles: Object,
  dispatch: Function,
}

// http://redux-form.com/6.4.3/examples/material-ui/
class TextField extends PureComponent {

  getInputNode = () => {

    return this.input

  }

  props: Props
  input: HTMLElement

  render (): React$Element<any> {

    /* eslint-disable no-unused-vars */
    const {
      input,
      label,
      customStyles,
      style,
      meta: { touched, error },
      dispatch,
      ...props
    } = this.props
    /* eslint-enable */

    const customStyle = {
      width: '100%',
      ...style,
    }

  // http://www.material-ui.com/#/components/text-field
    return (
      <MuiTextField
        ref={(ref) => {

          this.input = ref

        }}
        errorText={touched && error}
        floatingLabelText={label}
        floatingLabelStyle={{
          color: vars.colorDark,
          fontWeight: 500,
          fontSize: '14px',
        }}
        floatingLabelShrinkStyle={{
          color: vars.colorGray,
        }}
        floatingLabelFocusStyle={{
          color: vars.colorGray,
        }}
        underlineFocusStyle={{
          borderColor: vars.colorGray,
        }}
        style={customStyle}
        errorStyle={{
          position: 'absolute',
          bottom: '-.7em',
        }}
        {...customStyles}
        {...input}
        {...props}
      />
    )

  }

}


export default TextField
