// @flow

const config = require('./server')

it('webpack server config matches snapshot', () => {

  expect(config).toMatchSnapshot()

})
