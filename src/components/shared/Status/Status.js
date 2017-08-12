// @flow
import React from 'react'
import { Route } from 'react-router'


type Props = {
  code: number,
  children: React$Element<any>,
}

const Status = ({ children, code }: Props) => (
  <Route render={({ staticContext }) => {

    // eslint-disable-next-line no-param-reassign
    if (staticContext) staticContext.code = code

    // Make sure there is only one child... cannot be array!
    return children

  }}
  />
)


export default Status
