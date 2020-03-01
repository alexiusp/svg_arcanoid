import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';

import { STATE_STORE_KEY } from './constants';
import InputController from './input/InputController';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import getStore, { RootState } from './store';

let preloadedState: RootState | undefined;
try {
  const saved = localStorage.getItem(STATE_STORE_KEY);
  if (saved) {
    preloadedState = JSON.parse(saved);
  }
} catch (error) {
  console.error(error);
}

const store = getStore(preloadedState);
ReactDOM.render(
  <Provider store={store}>
    <InputController />
    <Root />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
