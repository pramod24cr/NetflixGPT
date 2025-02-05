/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsr4hAyNrQI3isniW79tN47jH0UcSqipw",
  authDomain: "netflixgpt-8f8bb.firebaseapp.com",
  projectId: "netflixgpt-8f8bb",
  storageBucket: "netflixgpt-8f8bb.firebasestorage.app",
  messagingSenderId: "217832423742",
  appId: "1:217832423742:web:da137a872607392f7bec6f",
  measurementId: "G-VYZ2XWVR80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth();
