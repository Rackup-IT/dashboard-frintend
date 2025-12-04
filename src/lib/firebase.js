// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
