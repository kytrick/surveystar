import axios from 'axios';
import { FETCH_USER } from './types';

// define our action creator, using thunk
// inspects before returns
// we don't want to dispatch an action
// until the api request has been completed!
export const fetchUser = () => {
  return function(dispatch) {
    axios
      .get('/api/current_user')
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};
