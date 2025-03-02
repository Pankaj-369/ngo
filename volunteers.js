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

// Function to create a volunteer card
function createVolunteerCard(name, email, phone, skills, profilePic) {
    return `
        <div class="card">
            <img src="${profilePic || 'https://via.placeholder.com/320x180'}" alt="Profile">
            <h3>${name}</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Skills:</strong> ${skills ? skills.join(", ") : "N/A"}</p>
        </div>
    `;
}

// Function to fetch volunteers
async function fetchVolunteers() {
    const querySnapshot = await getDocs(collection(db, "volunteers"));
    const volunteerContainer = document.getElementById("volunteersList");

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const cardHTML = createVolunteerCard(
            data.name,
            data.email,
            data.phone,
            data.skills,
            data.profilePic
        );
        volunteerContainer.innerHTML += cardHTML;
    });
}

// Fetch & Display Volunteers
fetchVolunteers();
