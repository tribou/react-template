// @flow
import { Map, Record } from 'immutable'
import { Observable } from 'rxjs/Observable'
import axios from 'axios'


export const FETCH_PROFILE: string = 'my-app/profile/FETCH_PROFILE'
export const FETCH_PROFILE_SUCCESS: string = 'my-app/profile/FETCH_PROFILE_SUCCESS'
export const FETCH_PROFILE_ERROR: string = 'my-app/profile/FETCH_PROFILE_ERROR'


// Flow type for this model
// add "T" to the end if there is a naming colision
type ProfileT = Record<{
  id: number,
  firstName: string,
  lastname: string,
  email: string,
  city: string,
  dob: string,
  notifications: boolean,
  picture: string,
}>

// Flow type for this reducer's state
export type ProfileState = Record<{
  me: number,
  list: Map<[[number, ProfileT]]>,
}>

// Flow type for this reducer's action
// Use Flux Standard Action (FSA) notation
// https://github.com/acdlite/flux-standard-action
// However we alway pass the payload. If empty, pass {} to avoid runtime errors
type PayloadFSA = {}
type FetchPayloadFSA = {
  url: string,
}

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


function reducer (
  state?: ProfileState = initialState,
  action: GlobalFSA<PayloadFSA>
): ProfileState {

  switch (action.type) {

    default:
      return state

  }

}


// Action Creators
export const fetchProfile = (payload: PayloadFSA): GlobalFSA<PayloadFSA> => {

  return {
    type: FETCH_PROFILE,
    payload,
  }

}

const fetchProfileSuccess = (): GlobalFSA<PayloadFSA> => {

  return {
    type: FETCH_PROFILE_SUCCESS,
    payload: {},
  }

}

const fetchProfileError = (): GlobalFSA<PayloadFSA> => {

  return {
    type: FETCH_PROFILE_ERROR,
    payload: {},
    error: true,
  }

}
// Always append error: true for redux action error types


// Redux-Observable Epics
// variable$ notation indicates an event stream
export const fetchProfileEpic = (action$: Observable) => {

  action$.ofType(FETCH_PROFILE)
    .mergeMap((action: GlobalFSA<FetchPayloadFSA>) => {

      axios.get(action.payload.url)

    })
    .map(fetchProfileSuccess)
    .catch(fetchProfileError)

}


export default reducer
