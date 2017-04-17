// @flow
// "Shallow" reducer state example doesn't need Immutable
export const LOAD = 'my-app/init/LOAD'
export const LOAD_SUCCESS = 'my-app/init/LOAD_SUCCESS'


export type InitState = {
  isLoading: boolean,
  loaded: boolean,
}


export const initialState = {
  isLoading: true,
  loaded: false,
}


function reducer (state: InitState = initialState, action: GlobalFSA<*>) {

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
// export const load = () => {

//   return {
//     type: LOAD,
//   }

// }

export const loadSuccess = () => {

  return {
    type: LOAD_SUCCESS,
  }

}


export default reducer
