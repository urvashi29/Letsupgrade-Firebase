import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXZtFFhLEkZLFcujMZ4mnJbhmkNZ0xJsE",
  authDomain: "task-manager-demo-bc6cd.firebaseapp.com",
  projectId: "task-manager-demo-bc6cd",
  storageBucket: "task-manager-demo-bc6cd.firebasestorage.app",
  messagingSenderId: "604251544642",
  appId: "1:604251544642:web:91a12a166db482b167a1db",
  measurementId: "G-F3EC4LT2E7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
