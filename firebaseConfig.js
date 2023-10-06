// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp6GlpZi_rIAdr2NqZtC6ItWfjZ9LSbAE",
  authDomain: "goodneighubors.firebaseapp.com",
  projectId: "goodneighubors",
  storageBucket: "goodneighubors.appspot.com",
  messagingSenderId: "192394332788",
  appId: "1:192394332788:web:72eee177e2e313243b9f21",
  measurementId: "G-F6H0KCJN2T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
