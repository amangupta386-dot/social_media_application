// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzJUlkWSYkDEiWGg_PfVVjinoVPIAh8Z0",
  authDomain: "socialmediaapp-25e24.firebaseapp.com",
  projectId: "socialmediaapp-25e24",
  storageBucket: "socialmediaapp-25e24.firebasestorage.app",
  messagingSenderId: "717482523788",
  appId: "1:717482523788:web:e90c73d6de64741f0dcfa9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;