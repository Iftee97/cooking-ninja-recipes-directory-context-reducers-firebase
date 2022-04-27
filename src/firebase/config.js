import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA1BSR9nlzchgmml8h3ZDPsUL2u7BW6SV4",
    authDomain: "cooking-ninja-site-46c6c.firebaseapp.com",
    projectId: "cooking-ninja-site-46c6c",
    storageBucket: "cooking-ninja-site-46c6c.appspot.com",
    messagingSenderId: "469154235029",
    appId: "1:469154235029:web:70d03d4bedd34634b3519c",
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// initialize services
const projectFirestore = firebase.firestore();

export { projectFirestore };
