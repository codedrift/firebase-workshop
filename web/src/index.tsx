// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Set firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDW1I9oQK2I11HT_V1fdSM36ym3pM4bT1w",
  authDomain: "fir-workshop-base.firebaseapp.com",
  projectId: "fir-workshop-base",
  storageBucket: "fir-workshop-base.appspot.com",
  messagingSenderId: "710965875651",
  appId: "1:710965875651:web:7d91c267e0034dcc4e6376",
};

// Initialize Firebase
// This initializes firebase globally
// from now on you can use any firebase component
initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
