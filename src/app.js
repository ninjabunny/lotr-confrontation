import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import { Box } from './containers';
import { combineReducers } from 'redux';
import { firebaseSync } from './actions';
import { fb } from './firebase';

const store = createStore(reducer);

fb.set({
	locations: store.getState().locations,
	msgs: [],
	movedTo: ''
});

fb.on('value', snapshot => {
	store.dispatch(firebaseSync(snapshot.val()));	
});


render(
  <Provider store={store}>
    <Box />
  </Provider>,
  document.getElementById('app')
);

