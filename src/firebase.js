import * as firebase from 'firebase';

var hash = window.location.hash;
if (hash.toString().length > 0) {
	hash = hash.toString().slice(1);
}

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD9IGRHaeJ6LcvgUAn3xPTsChxCkP4J9ds",
  authDomain: "lotr-confrontation.firebaseapp.com",
  databaseURL: "https://lotr-confrontation.firebaseio.com",
  storageBucket: "lotr-confrontation.appspot.com",
  messagingSenderId: "307523636073"
};

export const fb = firebase.initializeApp(config).database().ref(hash + '/');
	