import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import './index.css';
import { configureStore } from './redux';
import App from './App';
import * as serviceWorker from './serviceWorker';

let client = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT
});
const store = configureStore({}, client);

ReactDOM.render(
  <AppContainer>
    <Router>
      <HelmetProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </HelmetProvider>
    </Router>
  </AppContainer>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
