// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcHYmUt0468_by8iCck-4OEe9ZbLduHGs",
  authDomain: "bdc-professionals.firebaseapp.com",
  projectId: "bdc-professionals",
  storageBucket: "bdc-professionals.firebasestorage.app",
  messagingSenderId: "315536007132",
  appId: "1:315536007132:web:fe91ac4baca1821058f919",
  measurementId: "G-L2SW05Q0RJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
