// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRxY4yTo284Phowkqq5tCtdssvrmChSxI",
  authDomain: "react-task-app-3f109.firebaseapp.com",
  projectId: "react-task-app-3f109",
  storageBucket: "react-task-app-3f109.appspot.com",
  messagingSenderId: "31551518973",
  appId: "1:31551518973:web:33b9bee9b2092c3225a694",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
export { auth };
export default db;
