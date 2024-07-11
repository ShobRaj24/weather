// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDIV_WtGDmm5cWiWiZMvoQrsh7S5Y-UcKM",
  authDomain: "weather-9f182.firebaseapp.com",
  projectId: "weather-9f182",
  storageBucket: "weather-9f182.appspot.com",
  messagingSenderId: "540815083419",
  appId: "1:540815083419:web:81cdd3576f5b8ad782033e",
  measurementId: "G-WFR7EP1G6S",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
