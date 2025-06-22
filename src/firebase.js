import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwq3vfiGaRFNqqK0udDmuZ3tbQTULqFn8",
  authDomain: "proyectgit-af5a8.firebaseapp.com",
  projectId: "proyectgit-af5a8",
  storageBucket: "proyectgit-af5a8.firebasestorage.app",
  messagingSenderId: "622856718795",
  appId: "1:622856718795:web:d47f35e3eaed09e1df8e4e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;