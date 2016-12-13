// @flow
// Non-shallow reducer state example needs Immutable
// Async actions need redux-observable epics
// import Debug from 'debug'
import { Record } from 'immutable'
import { Observable } from 'rxjs'
import API from '../../helpers/api'
import type { APIError } from '../../helpers/api'

const api = new API()
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


const fetchProfileSuccess = (me: Object) => {

  return {
    type: FETCH_PROFILE_SUCCESS,
    payload: {
      me,
    },
  }

}


const fetchProfileError = ({ statusCode }: APIError) => {

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


// EPICS
// variable$ notation indicates an event stream
// https://redux-observable.js.org/docs/basics/Epics.html
export const fetchProfileEpic = (action$: Observable) => {

  return action$.ofType(FETCH_PROFILE)
  .mergeMap((action) => {

    // Create new observable inside mergeMap so we don't cancel the entire epic
    // during catch
    // https://redux-observable.js.org/docs/recipes/ErrorHandling.html
    return api.getProfile()
    .map((response) => {

      // API serialization logic from API._parseResponse to Model
      const result = response.data.results[0]

      return {
        firstName: result.name.first,
        lastName: result.name.last,
        email: result.email,
        city: result.location.city,
        dob: result.dob,
        picture: result.picture.thumbnail,
      }

    })
    .map(fetchProfileSuccess)
    .catch((error) => {

      // Return and don't throw here because we've handled it
      return Observable.of(fetchProfileError(error))

    })

  })

}


export default reducer
