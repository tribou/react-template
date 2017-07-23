// @flow
// Non-shallow reducer state example needs nested reducers
// import Debug from 'debug'
import type { APIError } from 'src/helpers/api'

// const log = Debug('my-app:redux:modules:profile')


// ACTION TYPES
export const GET_PROFILE = 'my-app/examples/profile/GET_PROFILE'
export const GET_PROFILE_FULFILLED = 'my-app/examples/profile/GET_PROFILE_FULFILLED'
export const GET_PROFILE_REJECTED = 'my-app/examples/profile/GET_PROFILE_REJECTED'


// MODEL
// Profile model with default values
export type Profile = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  city: string,
  dob: string,
  notifications: boolean,
  picture: string,
}

const profile = {
  id: 1,
  firstName: '',
  lastName: '',
  email: '',
  city: 'nashville',
  dob: '1970-01-01T00:00:00.000Z',
  notifications: true,
  picture: '',
}


// Flow type for this reducer's initial state
export type ProfileState = {
  data: Profile,
  isFetching: boolean,
  error: ?string,
}

// Initial state with default values
export const initialState: ProfileState = {
  data: profile,
  error: '',
  isFetching: false,
}


// REDUCER
function reducer (state: ProfileState = initialState, action: GlobalFSA<*>) {

  switch (action.type) {

    case GET_PROFILE:
      return {
        ...state,
        isFetching: true,
      }

    case GET_PROFILE_FULFILLED:
      return {
        ...state,
        data: action.payload.me,
        error: '',
        isFetching: false,
      }

    case GET_PROFILE_REJECTED:
      return {
        ...state,
        data: initialState.data,
        error: action.payload.statusCode,
        isFetching: false,
      }

    default:
      return state

  }

}


// ACTION CREATORS
// Use Flux Standard Action (FSA) notation
// https://github.com/acdlite/flux-standard-action
export const fetchProfile = () => ({
  type: GET_PROFILE,
})


export const fetchProfileSuccess = (me: Object) => ({
  type: GET_PROFILE_FULFILLED,
  payload: {
    me,
  },
})


export const fetchProfileError = (error: APIError) => ({
  type: GET_PROFILE_REJECTED,
  payload: error,
  error: true,
})
// Always append { error: true } for redux action error types


export default reducer
