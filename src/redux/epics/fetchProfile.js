// @flow
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import {
  GET_PROFILE,
  fetchProfileSuccess,
  fetchProfileError,
} from 'src/redux/modules/examples/profile'
import API from 'src/helpers/observableApi'

const api = new API()


// Example redux-observable epic
// variable$ notation indicates an event stream
// https://redux-observable.js.org/docs/basics/Epics.html

const fetchProfileEpic = (action$: Object) => action$.ofType(GET_PROFILE)
  .mergeMap(action =>

    // Create new observable inside mergeMap so we don't cancel the entire epic
    // during catch
    // https://redux-observable.js.org/docs/recipes/ErrorHandling.html
     api.getProfile()
    .map(response => {

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
    .catch(error =>

      // Return and don't throw here because we've handled it
       Observable.of(fetchProfileError(error))))


export default fetchProfileEpic
