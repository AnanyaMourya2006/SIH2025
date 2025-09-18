// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa-ThXNd1Kx0X31vtMQtDjwlqjjrC1V8U",
  authDomain: "ayunex-c13c9.firebaseapp.com",
  projectId: "ayunex-c13c9",
  storageBucket: "ayunex-c13c9.firebasestorage.app",
  messagingSenderId: "579153508210",
  appId: "1:579153508210:web:dbf8cc36d31403673b8feb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
