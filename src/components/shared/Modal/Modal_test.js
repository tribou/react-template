// @flow

// Enzyme docs:
// http://airbnb.io/enzyme/docs/api/index.html

import React from 'react'
import get from 'lodash/get'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'src/redux/store'
import { MemoryRouter } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'config/muiTheme'
import InjectTapEventPlugin from 'react-tap-event-plugin'
import Modal from './Modal.index'

InjectTapEventPlugin()

const mockProps = {
}


it('renders null if no modal state or query', () => {

  const store = configureStore()
  const wrapper = mount(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <MemoryRouter initialEntries={['/']}>
          <Modal {...mockProps} />
        </MemoryRouter>
      </MuiThemeProvider>
    </Provider>
  )

  expect(wrapper.find('Modal').html()).toEqual(null)

})


it('renders <Login> if query m=login', () => {

  const store = configureStore()
  const wrapper = mount(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <MemoryRouter initialEntries={['/?m=login']}>
          <Modal {...mockProps} />
        </MemoryRouter>
      </MuiThemeProvider>
    </Provider>
  )

  expect(wrapper.find('Login').exists()).toEqual(true)

})


it('renders <Login> if location.state = { modal: "login" }', () => {

  const store = configureStore()
  const wrapper = mount(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <MemoryRouter initialEntries={[{ state: { modal: 'login' } }]}>
          <Modal {...mockProps} />
        </MemoryRouter>
      </MuiThemeProvider>
    </Provider>,
    { attachTo: document.body })

  expect(wrapper.find('Login').exists()).toEqual(true)
  wrapper.detach()

})


it('renders sets overflow to hidden when shown and visible when unmounting', () => {

  const store = configureStore()
  const wrapper = mount(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <MemoryRouter initialEntries={[{ state: { modal: 'login' } }]}>
          <Modal {...mockProps} />
        </MemoryRouter>
      </MuiThemeProvider>
    </Provider>,
    { attachTo: document.body })

  const hidden = get(document, 'body.style.overflow')
  expect(hidden).toEqual('hidden')

  wrapper.detach()

  const visible = get(document, 'body.style.overflow')
  expect(visible).toEqual('visible')

})
