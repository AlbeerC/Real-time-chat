// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA424UgTSAr0ZDKejwIkwhMtzQFYSfHMxA",
  authDomain: "real-time-chat-56f1e.firebaseapp.com",
  projectId: "real-time-chat-56f1e",
  storageBucket: "real-time-chat-56f1e.appspot.com",
  messagingSenderId: "1079767685495",
  appId: "1:1079767685495:web:61a3768b52dd7153566972"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }