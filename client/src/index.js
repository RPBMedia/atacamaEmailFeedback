import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';


import 'materialize-css/dist/css/materialize.min.css';

import App from './components/App';
import reducers from './reducers';

//Debug only
import axios from 'axios';
window.axios = axios;
//test survey
// const survey = { title: 'Atacama test: My title', subject: 'My subject', recipients: 'rui.palma.baiao@gmail.com,martacalado20@gmail.com', body:'Email test content'}

// const store = createStore(reducers, {}, applyMiddleware(reduxThunk, logger));
//With no logger
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);

console.log('Stripe key: ', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment: ', process.env.NODE_ENV);
