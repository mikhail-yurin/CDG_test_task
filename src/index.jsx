import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// UI
import Player from './components/Player';
// Store
import store from './store';

window.onload = () => {
  const appContainer = document.querySelector('#app');
  ReactDOM.render(
    (
      <Provider store={store}>
        <Player />
      </Provider>
    ),
    appContainer,
  );
};
