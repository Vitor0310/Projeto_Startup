// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUZBJ9ZyHPPx83A5s1vvgeIbc7xvip6ak",
  authDomain: "vagaja-327e8.firebaseapp.com",
  projectId: "vagaja-327e8",
  storageBucket: "vagaja-327e8.firebasestorage.app",
  messagingSenderId: "160110923598",
  appId: "1:160110923598:web:c82e2c8cccc3b6ea7b181f",
  measurementId: "G-5VBZG6TLYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);