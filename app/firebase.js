// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0eDbLWZhha7Ct5NNqm9rs495j4dAq1Zc",
  authDomain: "pantry-app-89ca4.firebaseapp.com",
  projectId: "pantry-app-89ca4",
  storageBucket: "pantry-app-89ca4.appspot.com",
  messagingSenderId: "369371611042",
  appId: "1:369371611042:web:cd48979696d3ebf23c7cfb",
  measurementId: "G-TR6LY8SP2R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app) 
export {firestore}