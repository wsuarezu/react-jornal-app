// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl-W49gQZ24ZX7_cj0Ylt-IMJs0A892Z0",
  authDomain: "react-cursos-1dddc.firebaseapp.com",
  projectId: "react-cursos-1dddc",
  storageBucket: "react-cursos-1dddc.appspot.com",
  messagingSenderId: "940168796444",
  appId: "1:940168796444:web:1370cd571050f02f5d02d9"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB  = getFirestore(FirebaseApp);
