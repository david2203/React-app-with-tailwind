import dotenv from 'dotenv'

import firebase from "firebase";

dotenv.config();
console.log(process.env.REACT_APIKEY)

const firebaseConfig = {
  apiKey: "AIzaSyCqluHCR8ATz7WDA3cgr_LBQmR07LfusoE",
  authDomain: "fire-to-test.firebaseapp.com",
  projectId: "fire-to-test",
  storageBucket: "fire-to-test.appspot.com",
  messagingSenderId: "110880590511",
  appId: "1:110880590511:web:cb136e231a13949f73225a",
  measurementId: "G-VN34ENXT86"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firestore = firebaseApp.firestore()

export default firestore;