import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyCIKis22qb5fDnkRABgfzm8zq2fi7yaI6E",
  authDomain: "watermelongisapp.firebaseapp.com",
  projectId: "watermelongisapp",
  storageBucket: "watermelongisapp.appspot.com",
  messagingSenderId: "429822291246",
  appId: "1:429822291246:web:b5578743c899a029139ebf"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
