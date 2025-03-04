// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAyb9DmFfZuo98TJt0T_sJOr9uQe3bkYNQ",
    authDomain: "redux-store-fbd69.firebaseapp.com",
    databaseURL: "https://redux-store-fbd69-default-rtdb.firebaseio.com",
    projectId: "redux-store-fbd69",
    storageBucket: "redux-store-fbd69.firebasestorage.app",
    messagingSenderId: "723254767589",
    appId: "1:723254767589:web:bbcb8d023fc38a3fb4090c",
    measurementId: "G-DVYLLF63Y2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login function
window.login = function () {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let userType = document.getElementById("userType").value;

    if (email === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert(`Logged in as ${userType}`);

            // Redirect based on user type
            if (userType === "ngo") {
                window.location.href = "ngos.html";
            } else {
                window.location.href = "volunteers.html";
            }
        })
        .catch((error) => {
            alert(error.message);
        });
};

// Check if user is already logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        alert(`Already logged in as ${user.email}`);
        // Redirect to respective dashboard if needed
    }
});
