// @flow
import { Map, Record } from 'immutable'
import axios from 'axios'

import type { Observable } from 'rxjs'


export const FETCH_PROFILE = 'my-app/profile/FETCH_PROFILE'
export const FETCH_PROFILE_SUCCESS = 'my-app/profile/FETCH_PROFILE_SUCCESS'
export const FETCH_PROFILE_ERROR = 'my-app/profile/FETCH_PROFILE_ERROR'


// Profile model with default values
export const Profile = Record({
  id: 1,
  firstName: '',
  lastName: '',
  email: '',
  city: 'Nashville, TN',
  dob: '1970-01-01T00:00:00.000Z',
  notifications: true,
  picture: '',
})


// Flow type for this reducer's state
export type ProfileState = Record<{
  me: number,
  list: Map<>,
}>


// Initial state with default values
const InitialState = Record({
  me: 1,
  list: Map([
    [1, new Profile()], // Use tuple to ensure numbers are always used for ids
  ]),
})


export const initialState = new InitialState()
// Now we can retrieve city with initialState.getIn(['list', 1, 'city'])
// Or my city with initialState.getIn(['list', initialState.get('me'), 'city'])


function reducer (state: ProfileState = initialState, action: GlobalFSA<*>) {

  switch (action.type) {

    default:
      return state

  }

}


// Action Creators
// Use Flux Standard Action (FSA) notation
// https://github.com/acdlite/flux-standard-action
type FetchPayload = {
  url: string
}

export const fetchProfile = (payload: GlobalFSA<FetchPayload>) => {

  return {
    type: FETCH_PROFILE,
    payload,
  }

}

const fetchProfileSuccess = () => {

  return {
    type: FETCH_PROFILE_SUCCESS,
  }

}

const fetchProfileError = () => {

  return {
    type: FETCH_PROFILE_ERROR,
    error: true,
  }

}
// Always append error: true for redux action error types


// Redux-Observable Epics
// variable$ notation indicates an event stream
export const fetchProfileEpic = (action$: Observable) => {

  action$.ofType(FETCH_PROFILE)
    .mergeMap((action) => {

      axios.get(action.payload.url)

    })
    .map(fetchProfileSuccess)
    .catch(fetchProfileError)

}


export default reducer
