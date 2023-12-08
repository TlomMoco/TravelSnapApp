import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5MS8FCTFLwnUPXaDN9TIqMwrzJuC0E0Y",
  authDomain: "travelsnapapp-37187.firebaseapp.com",
  databaseURL: "https://travelsnapapp-37187-default-rtdb.firebaseio.com",
  projectId: "travelsnapapp-37187",
  storageBucket: "travelsnapapp-37187.appspot.com",
  messagingSenderId: "469498184024",
  appId: "1:469498184024:web:81af174e30319e42bf252d",
  measurementId: "G-Z2HJ8HBMZY"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_GET_APP = getApp()
export const FIREBASE_STORAGE = getStorage()
