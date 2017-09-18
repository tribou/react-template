// @flow
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction'

const devtools = () => devToolsEnhancer({
  maxAge: 100,
})

export default devtools
