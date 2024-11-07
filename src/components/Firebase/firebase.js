// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB1BdTN0AdZjqGFGbP-BSuLlxE7MwPatWc",
  authDomain: "loginandsignuppage-6e98d.firebaseapp.com",
  projectId: "loginandsignuppage-6e98d",
  storageBucket: "loginandsignuppage-6e98d.firebasestorage.app",
  messagingSenderId: "Y791380256807",
  appId: "Y1:791380256807:web:dee323da0a31573973c602",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
