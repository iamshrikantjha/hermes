// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt4q1EfwiGmOEcFEZh8LY8wttdHTu_blo",
  authDomain: "hermes-f04ed.firebaseapp.com",
  databaseURL: "https://hermes-f04ed-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hermes-f04ed",
  storageBucket: "hermes-f04ed.firebasestorage.app",
  messagingSenderId: "923258294307",
  appId: "1:923258294307:web:d50ea89e5a573eca466196",
  measurementId: "G-1SFMRL79RQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);