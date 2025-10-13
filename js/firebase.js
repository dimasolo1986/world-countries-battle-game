import { initializeApp } from "./firebase-app.js";
import { getAnalytics } from "./firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBz5cGGomnSf6XR_SBN-mxVEslHQGDWnKs",
  authDomain: "country-alliance-guesser.firebaseapp.com",
  projectId: "country-alliance-guesser",
  storageBucket: "country-alliance-guesser.firebasestorage.app",
  messagingSenderId: "834183240701",
  appId: "1:834183240701:web:78bef8f2f4c9f9b81a5794",
  measurementId: "G-523TP6VSTM",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
