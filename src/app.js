import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import { Box } from './containers';
import { combineReducers } from 'redux'

const store = createStore(reducer);

window.state = store.getState();

render(
  <Provider store={store}>
    <Box />
  </Provider>,
  document.getElementById('app')
);

