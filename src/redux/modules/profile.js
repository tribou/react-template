// @flow
// Non-shallow reducer state example needs Immutable
// Async actions need redux-observable epics
// import Debug from 'debug'
import { Record } from 'immutable'
import type { APIError } from '../../helpers/api'

// const log = Debug('my-app:redux:modules:profile')


// ACTION TYPES
export const FETCH_PROFILE = 'my-app/profile/FETCH_PROFILE'
export const FETCH_PROFILE_SUCCESS = 'my-app/profile/FETCH_PROFILE_SUCCESS'
export const FETCH_PROFILE_ERROR = 'my-app/profile/FETCH_PROFILE_ERROR'


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
  error: false,
  isFetching: false,
})


export const initialState = new InitialState()


// REDUCER
function reducer (state: ProfileState = initialState, action: GlobalFSA<*>) {

  switch (action.type) {

    case FETCH_PROFILE:
      return state.set('isFetching', true)

    case FETCH_PROFILE_SUCCESS:
      return state
        .set('me', new Profile(action.payload.me))
        .set('isFetching', false)

    case FETCH_PROFILE_ERROR:
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
    type: FETCH_PROFILE,
  }

}


export const fetchProfileSuccess = (me: Object) => {

  return {
    type: FETCH_PROFILE_SUCCESS,
    payload: {
      me,
    },
  }

}


export const fetchProfileError = ({ statusCode }: APIError) => {

  // Parse and define user-friendly messages here?
  const message = statusCode >= 500
    ? 'There was a problem getting your profile. Please, try again later'
    : 'There was a problem getting your profile. Please, try logging out and back in.'

  return {
    type: FETCH_PROFILE_ERROR,
    payload: {
      statusCode,
      message,
    },
    error: true,
  }

}
// Always append { error: true } for redux action error types


export default reducer
