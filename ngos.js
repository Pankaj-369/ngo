// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Config
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to create an NGO card
function createNgoCard(ngoName, email, phone, cause, profilePic, website) {
    return `
        <div class="card">
            <img src="${profilePic || 'https://via.placeholder.com/320x180'}" alt="NGO Logo">
            <h3>${ngoName}</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Cause:</strong> ${cause || "N/A"}</p>
            ${website ? `<a href="${website}" target="_blank">Visit Website</a>` : ""}
        </div>
    `;
}

// Function to fetch NGOs
async function fetchNGOs() {
    const querySnapshot = await getDocs(collection(db, "ngos"));
    const ngoContainer = document.getElementById("ngoList");

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const cardHTML = createNgoCard(
            data.ngoName || "N/A",
            data.email,
            data.phone,
            data.cause,
            data.profilePic,
            data.website
        );
        ngoContainer.innerHTML += cardHTML;
    });
}

// Fetch & Display NGOs
fetchNGOs();
