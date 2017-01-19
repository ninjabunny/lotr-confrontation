import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD9IGRHaeJ6LcvgUAn3xPTsChxCkP4J9ds",
  authDomain: "lotr-confrontation.firebaseapp.com",
  databaseURL: "https://lotr-confrontation.firebaseio.com",
  storageBucket: "lotr-confrontation.appspot.com",
  messagingSenderId: "307523636073"
};

export const fb = firebase.initializeApp(config).database().ref();