// @flow

const config = require('./browser')

it('webpack config matches snapshot', () => {

  expect(config).toMatchSnapshot()

})
