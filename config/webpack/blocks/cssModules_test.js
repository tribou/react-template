// @flow

jest.mock('extract-text-webpack-plugin')

const webpack = require('webpack')
const config = require('./cssModules')

const mockContext = {
  fileType: () => {},
  platform: 'browser',
  webpack,
}
mockContext.fileType.add = () => {}


it('generates client dev config', () => {

  mockContext.platform = 'browser'
  const OLD_ENV = process.env.NODE_ENV
  process.env.NODE_ENV = 'development'

  expect(config()(mockContext)).toMatchSnapshot()
  process.env.NODE_ENV = OLD_ENV

})

it('generates client prod config', () => {

  mockContext.platform = 'browser'
  const OLD_ENV = process.env.NODE_ENV
  process.env.NODE_ENV = 'production'

  expect(config()(mockContext)).toMatchSnapshot()
  process.env.NODE_ENV = OLD_ENV

})

it('generates server dev config', () => {

  mockContext.platform = 'server'
  const OLD_ENV = process.env.NODE_ENV
  process.env.NODE_ENV = 'development'

  expect(config()(mockContext)).toMatchSnapshot()
  process.env.NODE_ENV = OLD_ENV

})

it('generates server prod config', () => {

  mockContext.platform = 'server'
  const OLD_ENV = process.env.NODE_ENV
  process.env.NODE_ENV = 'production'

  expect(config()(mockContext)).toMatchSnapshot()
  process.env.NODE_ENV = OLD_ENV

})
