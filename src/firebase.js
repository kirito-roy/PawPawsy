import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDlqLc2Fq-tp_LIy1h5k0VXnl_wiBnUKY0",
    authDomain: "pawpawsy.firebaseapp.com",
    projectId: "pawpawsy",
    storageBucket: "pawpawsy.firebasestorage.app",
    messagingSenderId: "153275426304",
    appId: "1:153275426304:web:d423fd9e8e211b28b71ae5",
    measurementId: "G-P807ZK4TF7"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Optional: Initialize analytics (won’t work in localhost without HTTPS)
// const analytics = getAnalytics(app);

export { auth, provider, signInWithPopup, signOut };
