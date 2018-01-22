import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

//
// Development only axios helpers
// test before writing front-extends
import axios from 'axios';
window.axios = axios;
// type this into the console:
// const survey = {title: 't', subject: 's', recipients: 'kytrick@gmail.com', body: 'b'};
// axios.post('/api/surveys', survey);
// should see an email go through!
//

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
);

console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is', process.env.NODE_ENV);
