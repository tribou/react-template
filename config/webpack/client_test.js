// @flow

const config = require('../../webpack.config')

it('webpack config matches snapshot', () => {

  expect(config).toMatchSnapshot()

})
