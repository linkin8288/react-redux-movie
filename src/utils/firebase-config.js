// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTWPkhGD8nkhNKuCuiZfc2CwInViaN32s",
  authDomain: "react-netlfix-clone-5ce0f.firebaseapp.com",
  projectId: "react-netlfix-clone-5ce0f",
  storageBucket: "react-netlfix-clone-5ce0f.appspot.com",
  messagingSenderId: "548436773521",
  appId: "1:548436773521:web:832a2805c21a26cde00d30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);