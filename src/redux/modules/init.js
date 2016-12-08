// @flow
export const LOAD: string = 'my-app/init/LOAD'
export const LOAD_SUCCESS: string = 'my-app/init/LOAD_SUCCESS'


type InitAction = {
  type?: string,
}

export type InitState = {
  isLoading: boolean,
  loaded: boolean,
}


export const initialState: InitState = {
  isLoading: true,
  loaded: false,
}


function reducer (state?: InitState = initialState, action: InitAction)
  : InitState {

  switch (action.type) {


    case LOAD:
      return {
        ...state,
        isLoading: true,
      }

    case LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
      }


    default:
      return state

  }

}


// Removed from implementation until the need arises
// For now, we assume that the app arrives in loading state
export function load (): InitAction {

  return {
    type: LOAD,
  }

}

export function loadSuccess (): InitAction {

  return {
    type: LOAD_SUCCESS,
  }

}


export default reducer
