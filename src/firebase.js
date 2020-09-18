// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA5Gx6cs7yfnqGxt7PecuYpRkwgy1EaBDY",
  authDomain: "jagan-47f02.firebaseapp.com",
  databaseURL: "https://jagan-47f02.firebaseio.com",
  projectId: "jagan-47f02",
  storageBucket: "jagan-47f02.appspot.com",
  messagingSenderId: "774113312224",
  appId: "1:774113312224:web:95c9f5aa20724594b97f85",
  measurementId: "G-VJKPGL9TTN"
};




// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseAuth=firebase.auth();

export const firestore=firebase.firestore();

export const storageRef=firebase.storage().ref();

export default firebase;