// @flow
import { LOAD, LOAD_SUCCESS } from './consts'

// Removed from implementation until the need arises
// For now, we assume that the app arrives in loading state
export const load = () => ({ type: LOAD })
export const loadSuccess = () => ({ type: LOAD_SUCCESS })
