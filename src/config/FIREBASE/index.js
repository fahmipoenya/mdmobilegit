import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyCYov76fZ-Tggty-I6Akh2tF0wHZ8H-BXk",
//   authDomain: "jersipedia.firebaseapp.com",
//   databaseURL: "https://jersipedia.firebaseio.com",
//   projectId: "jersipedia",
//   storageBucket: "jersipedia.appspot.com",
//   messagingSenderId: "730017372448",
//   appId: "1:730017372448:web:4f5056031455d1e508df45"
// };
const firebaseConfig = {
  apiKey: "AIzaSyAgts2qv3FqZmKDrFRDAH_aGFp6gqa5qr8",
  authDomain: "mdenter-fac3e.firebaseapp.com",
  databaseURL: "https://mdenter-fac3e-default-rtdb.firebaseio.com/",
  projectId: "mdenter-fac3e",
  storageBucket: "mdenter-fac3e.appspot.com",
  messagingSenderId: "4639834454",
  appId: "1:4639834454:web:17ab7a508464d361ab56f7"
};


const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
