// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDU9rfq1C5guJ1jnfO70Bd5WSdr3NY841I",
  authDomain: "crud-diplomado-e1db9.firebaseapp.com",
  projectId: "crud-diplomado-e1db9",
  storageBucket: "crud-diplomado-e1db9.appspot.com",
  messagingSenderId: "401453371806",
  appId: "1:401453371806:web:111724b8e6ea7907c6068f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}