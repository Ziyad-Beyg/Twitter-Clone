import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, onSnapshot, addDoc, collection, getDocs,orderBy, query,where } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
const firebaseApp = initializeApp({
    apiKey: "AIzaSyCS2THb5MB2A0dZkWu3erqWAJTNQh8hqO8",
    authDomain: "twitter-clone-3410b.firebaseapp.com",
    projectId: "twitter-clone-3410b",
    storageBucket: "twitter-clone-3410b.appspot.com",
    messagingSenderId: "490814372359",
    appId: "1:490814372359:web:194b9cfd9de7333ecc48a2",
    measurementId: "G-Z3QLT2H56T"
});

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,

    db,
    doc,
    setDoc,
    getDoc,
    addDoc,
    collection,
    getDocs,
    query,
    where,
    onSnapshot,
    orderBy,

    storage,
    ref,
    getDownloadURL,
    uploadBytes 
};