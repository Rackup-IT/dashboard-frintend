// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "rackup-4d11f.firebaseapp.com",
  projectId: "rackup-4d11f",
  storageBucket: "rackup-4d11f.firebasestorage.app",
  messagingSenderId: "376004764652",
  appId: "1:376004764652:web:763be8d7ef580c9d27d6c9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
