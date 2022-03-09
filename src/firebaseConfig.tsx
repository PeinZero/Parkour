import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf3HcJlKu7uXUpl-ggGWiI-LIOvBzSnoY",
  authDomain: "parkour-336414.firebaseapp.com",
  projectId: "parkour-336414",
  storageBucket: "parkour-336414.appspot.com",
  messagingSenderId: "144640928276",
  appId: "1:144640928276:web:7d5e8f8179336e7d589501",
  measurementId: "G-PC8DE8HHEJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
