// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZGp7ObiFOJc0CGS_jKFgcChAVwSK8XJ4",
  authDomain: "store-app-a4024.firebaseapp.com",
  projectId: "store-app-a4024",
  storageBucket: "store-app-a4024.appspot.com",
  messagingSenderId: "872659239083",
  appId: "1:872659239083:web:a53cd51a02b5198076b7ee",
  measurementId: "G-YL2QP3V3C9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
