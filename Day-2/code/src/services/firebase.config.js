import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB77nGJCuorGiiz5Ck7lhRRd82TEJCaYvE",
  authDomain: "task-manager-3d135.firebaseapp.com",
  projectId: "task-manager-3d135",
  storageBucket: "task-manager-3d135.firebasestorage.app",
  messagingSenderId: "396519451205",
  appId: "1:396519451205:web:e7401ddf6691942d56512c",
  measurementId: "G-LEPKXEZ8NX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
