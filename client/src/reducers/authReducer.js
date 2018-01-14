import { FETCH_USER } from '../actions/types';

// responsible for deciding whether the user is logged in
export default function(state = null, action) {
  // console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; //this is the user model.
    default:
      return state;
  }
}
