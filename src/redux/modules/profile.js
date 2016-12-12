// @flow
// Non-shallow reducer state example needs Immutable
// Async actions need redux-observable epics
import Axios from 'axios'
import { Record } from 'immutable'
import { Observable } from 'rxjs'


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


// Flow type for this reducer's state
export type ProfileState = Record<>


// Initial state with default values
const InitialState = Record({
  me: new Profile(),
})


export const initialState = new InitialState()
// Now we can retrieve city with initialState.getIn(['list', 1, 'city'])
// Or my city with initialState.getIn(['list', initialState.get('me'), 'city'])


// REDUCER
function reducer (state: ProfileState = initialState, action: GlobalFSA<*>) {

  switch (action.type) {

    case FETCH_PROFILE_SUCCESS:
      return state.set('me', new Profile(action.payload.me))

    default:
      return state

  }

}


// ACTION CREATORS
// Use Flux Standard Action (FSA) notation
// https://github.com/acdlite/flux-standard-action
export const fetchProfile = (url: string) => {

  return {
    type: FETCH_PROFILE,
    payload: {
      url,
    },
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


const fetchProfileError = (error: { status: number }) => {

  const msg = error.status >= 500
    ? 'There was a problem getting your profile. Please, try again later'
    : 'There was a problem getting your profile. Please, try logging out and back in.'

  return {
    type: FETCH_PROFILE_ERROR,
    payload: new Error(msg),
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

      // Create new observable inside mergeMap so we don't cancel the entire
      // epic during catch
      // https://redux-observable.js.org/docs/recipes/ErrorHandling.html
      return Observable.fromPromise(Axios.get(action.payload.url))
        .map((response) => {

          // API serialization logic here next to implementation (axios)
          const result = response.data.results[0]

          return {
            firstName: result.name.first,
            lastName: result.name.last,
            email: result.email,
            city: result.location.city,
            dob: new Date(result.dob).toISOString(),
            picture: result.picture.thumbnail,
          }

        })
        .map(fetchProfileSuccess)
        .catch((error) => {

          return Observable.of(fetchProfileError(error))

        })

    })

}


export default reducer
