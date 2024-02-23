// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDL8lZEWo74HkMg-33EVoW2v2JO396ttUs",
  authDomain: "helperdesk-eae4c.firebaseapp.com",
  projectId: "helperdesk-eae4c",
  storageBucket: "helperdesk-eae4c.appspot.com",
  messagingSenderId: "334434918600",
  appId: "1:334434918600:web:f34cb87b0e431bff4285fd",
  measurementId: "G-MZY170K6XJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);