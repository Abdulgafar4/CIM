import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBocO9DGOEkTezPBnvUZy1wmx2hvGcgloM",
  authDomain: "cimanagement-83c31.firebaseapp.com",
  projectId: "cimanagement-83c31",
  storageBucket: "cimanagement-83c31.appspot.com",
  messagingSenderId: "473250803075",
  appId: "1:473250803075:web:64e8d75eb5fe0380729ab6",
  measurementId: "G-V073ZX0M1K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);