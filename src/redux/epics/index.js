// @flow

// Can replace rxjs import with individual operators with code-splitting in the
// future if bundle size becomes an issue.
// https://redux-observable.js.org/docs/Troubleshooting.html
import { combineEpics } from "redux-observable";
import fetchProfileEpic from "./fetchProfile";

// redux-observable
// Full example: http://jsbin.com/jexomi/edit?js,output
const rootEpic = combineEpics(fetchProfileEpic);

export default rootEpic;
