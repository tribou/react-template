// @flow
import { START_LOADING, STOP_LOADING } from './consts'

// ACTION CREATORS
// Use Flux Standard Action (FSA) notation
// https://github.com/acdlite/flux-standard-action
export const startLoading = () => ({ type: START_LOADING })

export const stopLoading = () => ({ type: STOP_LOADING })
