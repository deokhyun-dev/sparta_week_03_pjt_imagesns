import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDWjmXUveVUvEOWCXi-yhY2X2qOykYxzz8",
  authDomain: "sparta-w03-imagesns.firebaseapp.com",
  projectId: "sparta-w03-imagesns",
  storageBucket: "sparta-w03-imagesns.appspot.com",
  messagingSenderId: "247088945326",
  appId: "1:247088945326:web:e612665223128bbb49753f",
  measurementId: "G-3ZXZZG5PQS",
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, apiKey, firestore, storage };
