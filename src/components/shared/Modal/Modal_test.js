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
import Modal from './'

InjectTapEventPlugin()

const mockProps = {
}


it('renders null if no modal state or query', () => {

  const store = configureStore()
  const wrapper = mount(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <MemoryRouter initialEntries={['/']}>
          <Modal />
        </MemoryRouter>
      </MuiThemeProvider>
    </Provider>
  )

  expect(wrapper.find('Login').exists()).toEqual(false)

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

  const body = get(document, 'body')

  const div = document.createElement('div')
  div.id = 'test'
  body.appendChild(div)

  const store = configureStore()
  const wrapper = mount(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <MemoryRouter initialEntries={[{ state: { modal: 'login' } }]}>
          <Modal {...mockProps} />
        </MemoryRouter>
      </MuiThemeProvider>
    </Provider>,
    { attachTo: div })

  expect(wrapper.find('Login').exists()).toEqual(true)

  // cleanup
  wrapper.detach()
  body.removeChild(div)

})


it('renders sets overflow to hidden when shown and visible when unmounting', () => {

  const body = get(document, 'body')

  const div = document.createElement('div')
  div.id = 'test'
  body.appendChild(div)

  const store = configureStore()
  const wrapper = mount(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <MemoryRouter initialEntries={[{ state: { modal: 'login' } }]}>
          <Modal {...mockProps} />
        </MemoryRouter>
      </MuiThemeProvider>
    </Provider>,
    { attachTo: div })

  const hidden = get(document, 'body.style.overflow')
  expect(hidden).toEqual('hidden')

  // cleanup
  wrapper.detach()
  body.removeChild(div)

})


it('sets overflow to visible when rendering null', () => {

  const body = get(document, 'body')

  const div = document.createElement('div')
  div.id = 'test'
  body.appendChild(div)

  const store = configureStore()
  const wrapper = mount(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <MemoryRouter initialEntries={[{ pathname: '/' }]}>
          <Modal {...mockProps} />
        </MemoryRouter>
      </MuiThemeProvider>
    </Provider>,
    { attachTo: div })

  const visible = get(document, 'body.style.overflow')
  expect(visible).toEqual('visible')

  // cleanup
  wrapper.detach()
  body.removeChild(div)

})
