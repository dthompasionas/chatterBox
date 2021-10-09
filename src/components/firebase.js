import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyC8wHDSR9yF7auP7caeRBm-UtzP4YCt4to",
    authDomain: "chatterbox-1de99.firebaseapp.com",
    projectId: "chatterbox-1de99",
    storageBucket: "chatterbox-1de99.appspot.com",
    messagingSenderId: "961796637977",
    appId: "1:961796637977:web:5b59faf2881e0e7b373188"
}).auth();