// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlHy8tffn0_qt-NsLPcNma450RezwpJl0",
  authDomain: "authentication-demo-b1985.firebaseapp.com",
  projectId: "authentication-demo-b1985",
  storageBucket: "authentication-demo-b1985.firebasestorage.app",
  messagingSenderId: "908654725907",
  appId: "1:908654725907:web:9355b899af48d4eb1428e6",
  measurementId: "G-GSN1WX8HM3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const signInwithGoogle = () => {
  return signInWithPopup(auth, provider);
};
