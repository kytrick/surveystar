// this index.js is for the authReducer
import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';

//whatever keys we pass into this object are the
//keys that exist in our state object
export default combineReducers({
  auth: authReducer,
  form: reduxForm,
});
