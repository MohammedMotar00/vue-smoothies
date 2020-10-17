import firebase from "firebase";

var config = {
  apiKey: "AIzaSyB5EcHr1JYhm78bCkrzNO9btwmbIgF3Fz4",
  authDomain: "smoothie-vue-app.firebaseapp.com",
  databaseURL: "https://smoothie-vue-app.firebaseio.com",
  projectId: "smoothie-vue-app",
  storageBucket: "smoothie-vue-app.appspot.com",
  messagingSenderId: "859637534030",
  appId: "1:859637534030:web:3f26028dc1673e811fe21f",
  measurementId: "G-ZM2DE7PW2B",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore();

// Initialize Firebase
