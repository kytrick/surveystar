// this index.js is for the authReducer
import { combineReducers } from 'redux';
import authReducer from './authReducer';

//whatever keys we pass into this object are the
//keys that exist in our state object
export default combineReducers({
  auth: authReducer,
});
