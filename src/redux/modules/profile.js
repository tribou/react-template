// @flow
// Non-shallow reducer state example needs Immutable
// Async actions need redux-observable epics
// import Debug from 'debug'
import { Record } from 'immutable'
import type { APIError } from 'src/helpers/api'

// const log = Debug('my-app:redux:modules:profile')


// ACTION TYPES
export const GET_PROFILE = 'my-app/profile/GET_PROFILE'
export const GET_PROFILE_FULFILLED = 'my-app/profile/GET_PROFILE_FULFILLED'
export const GET_PROFILE_REJECTED = 'my-app/profile/GET_PROFILE_REJECTED'


// MODEL
// Profile model with default values
export const Profile = Record({
  id: 1,
  firstName: '',
  lastName: '',
  email: '',
  city: 'nashville',
  dob: '1970-01-01T00:00:00.000Z',
  notifications: true,
  picture: '',
})


// Flow type for this reducer's initial state
export type ProfileState = Record<*>

// Initial state with default values
const InitialState = Record({
  me: new Profile(),
  error: '',
  isFetching: false,
})


export const initialState = new InitialState()


// REDUCER
function reducer (state: ProfileState = initialState, action: GlobalFSA<*>) {

  switch (action.type) {

    case GET_PROFILE:
      return state.set('isFetching', true)

    case GET_PROFILE_FULFILLED:
      return state
        .set('me', new Profile(action.payload.me))
        .set('error', '')
        .set('isFetching', false)

    case GET_PROFILE_REJECTED:
      return state
        .set('error', action.payload.statusCode)
        .set('isFetching', false)

    default:
      return state

  }

}


// ACTION CREATORS
// Use Flux Standard Action (FSA) notation
// https://github.com/acdlite/flux-standard-action
export const fetchProfile = () => {

  return {
    type: GET_PROFILE,
  }

}


export const fetchProfileSuccess = (me: Object) => {

  return {
    type: GET_PROFILE_FULFILLED,
    payload: {
      me,
    },
  }

}


export const fetchProfileError = (error: APIError) => {


  return {
    type: GET_PROFILE_REJECTED,
    payload: error,
    error: true,
  }

}
// Always append { error: true } for redux action error types


export default reducer
