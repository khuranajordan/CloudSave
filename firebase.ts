import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXDrqr1ZvDfWhGDh80q8xqkb0zt_qfUGk",
  authDomain: "cloudsave-47485.firebaseapp.com",
  projectId: "cloudsave-47485",
  storageBucket: "cloudsave-47485.appspot.com",
  messagingSenderId: "324094019729",
  appId: "1:324094019729:web:b4b24b27f71a76e7539730",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
