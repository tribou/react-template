// @flow
import { Map, Record } from 'immutable'

export const LOAD: string = 'my-app/profile/LOAD'
export const LOAD_SUCCESS: string = 'my-app/profile/LOAD_SUCCESS'

// Flow type for this model
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
type ProfileAction = {
  type?: string,
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

function reducer (state?: ProfileState = initialState, action: ProfileAction)
  : ProfileState {

  switch (action.type) {

    default:
      return state

  }

}


export default reducer
