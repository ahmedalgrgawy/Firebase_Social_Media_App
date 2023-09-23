// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import exp from "constants";


const firebaseConfig = {
    apiKey: "AIzaSyAEV_tiWHetpOL0rxghm1eqoHRAn_RB69U",
    authDomain: "social-media-cf31c.firebaseapp.com",
    projectId: "social-media-cf31c",
    storageBucket: "social-media-cf31c.appspot.com",
    messagingSenderId: "822738681394",
    appId: "1:822738681394:web:505c8eab8ed255a3b1c62b",
    measurementId: "G-FXLXH5VPX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const dataBase = getFirestore(app);

