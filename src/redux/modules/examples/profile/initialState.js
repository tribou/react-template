// @flow
import type { ProfileState } from './types'

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

const initialState: ProfileState = {
  data: profile,
  error: '',
  isFetching: false,
}

export default initialState
