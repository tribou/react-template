// @flow
import type { APIError } from 'src/helpers/api'
import { GET_PROFILE, GET_PROFILE_FULFILLED, GET_PROFILE_REJECTED } from './consts'

// Use Flux Standard Action (FSA) notation
// https://github.com/acdlite/flux-standard-action
export const fetchProfile = () => ({
  type: GET_PROFILE,
})

export const fetchProfileSuccess = (me: Object) => ({
  type: GET_PROFILE_FULFILLED,
  payload: { me },
})

export const fetchProfileError = (error: APIError) => ({
  type: GET_PROFILE_REJECTED,
  payload: error,
  error: true,
})
// Always append { error: true } for redux action error types
