import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABHbjCt0kIhuuCoqhRkj-OTTQlD_mM94Q",
  authDomain: "watched-movies-new.firebaseapp.com",
  projectId: "watched-movies-new",
  storageBucket: "watched-movies-new.appspot.com",
  messagingSenderId: "394424976753",
  appId: "1:394424976753:web:f2a9c02c21bc66cdef22d0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default getFirestore(app)