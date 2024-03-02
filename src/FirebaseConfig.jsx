import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB6rqtcyIgqzqTs_Xo-JsvavZj4CemQsRg",
  authDomain: "projectone-a8a72.firebaseapp.com",
  projectId: "projectone-a8a72",
  storageBucket: "projectone-a8a72.appspot.com",
  messagingSenderId: "283986443559",
  appId: "1:283986443559:web:f3a2de1b9cb6722da53d02",
  databaseUrl: "https://projectone-a8a72-default-rtdb.firebaseio.com",
};

export const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
const firebaseStorage = getStorage(app);
export { fireDB, auth, firebaseStorage };
