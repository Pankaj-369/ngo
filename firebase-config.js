// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAyb9DmFfZuo98TJt0T_sJOr9uQe3bkYNQ",
    authDomain: "redux-store-fbd69.firebaseapp.com",
    databaseURL: "https://redux-store-fbd69-default-rtdb.firebaseio.com",
    projectId: "redux-store-fbd69",
    storageBucket: "redux-store-fbd69.appspot.com",
    messagingSenderId: "723254767589",
    appId: "1:723254767589:web:bbcb8d023fc38a3fb4090c",
    measurementId: "G-DVYLLF63Y2"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Firebase auth
export const auth = firebase.auth();
