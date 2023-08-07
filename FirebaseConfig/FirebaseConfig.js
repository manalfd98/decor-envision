import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBrB3xDE6Gs_rfteUfrSJMi9uz0qpWy-fw",
  authDomain: "decorenvision2.firebaseapp.com",
  projectId: "decorenvision2",
  storageBucket: "decorenvision2.appspot.com",
  messagingSenderId: "514031666941",
  appId: "1:514031666941:web:91600b7b7ed0971f176094"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);