import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import {initializeFirestore} from 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: "AIzaSyAx6mPjoJWfVFaDa1vglgzysvsZx2rX5Lw",
  authDomain: "reactserver-f51af.firebaseapp.com",
  projectId: "reactserver-f51af",
  storageBucket: "reactserver-f51af.appspot.com",
  messagingSenderId: "331628168350",
  appId: "1:331628168350:web:062f2b6208dc489351a78f"
})

const firestore = app.firestore()
export const database = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  formatDoc: doc => {
    return { id: doc.id, ...doc.data() }
  },
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
}

export const storage = firebase.firestore();
export const storageRef = firebase.storage().ref();

export const auth = app.auth()
export default app
