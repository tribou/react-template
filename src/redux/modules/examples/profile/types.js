// @flow

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

// Flow type for this reducer's initial state
export type ProfileState = {
  data: Profile,
  isFetching: boolean,
  error: ?string,
}
