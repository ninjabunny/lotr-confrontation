import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import { Box } from './containers';

const store = createStore(reducer);

render(
  <Provider store={store}>
    <Box />
  </Provider>,
  document.getElementById('app')
);

