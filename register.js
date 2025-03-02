
  // Import Firebase services
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
  import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

  // Your Firebase Config
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
  const auth = getAuth(app);
  const db = getFirestore(app);





    // Get form element
    const registerForm = document.getElementById("registrationForm");
  
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // Prevent page reload
  
      // Get form values
      const userType = document.getElementById("userType").value;
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const phone = document.getElementById("phone").value;
      const address = document.getElementById("address").value;
  
      // Handle profile picture upload (if any)
      const profilePic = document.getElementById("profilePic").files[0];
  
      // Additional fields for volunteers
      let skills = [];
      document.querySelectorAll('input[name="skills"]:checked').forEach((checkbox) => {
        skills.push(checkbox.value);
      });
      const preferredArea = document.querySelector('select[name="preferredArea"]')?.value;
      const availability = document.querySelector('select[name="availability"]')?.value;
      const experience = document.querySelector('textarea[name="experience"]')?.value;
  
      // Additional fields for NGOs
      const ngoName = document.getElementById("ngoName")?.value;
      const registrationNumber = document.getElementById("registrationNumber")?.value;
      const organizationType = document.querySelector('select[name="organizationType"]')?.value;
      const cause = document.querySelector('input[name="cause"]')?.value;
      const website = document.getElementById("website")?.value;
      const contactPerson = document.getElementById("contactPerson")?.value;
  
      try {
        // Step 1: Register the user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        let profilePicURL = "";
  
        // Step 2: Upload Profile Picture to Firebase Storage (if uploaded)
        if (profilePic) {
          const storageRef = ref(storage, `profilePics/${user.uid}`);
          await uploadBytes(storageRef, profilePic);
          profilePicURL = await getDownloadURL(storageRef);
        }
  
        // Step 3: Save user details in Firestore
        const userData = {
          uid: user.uid,
          name: name,
          email: email,
          phone: phone,
          address: address,
          profilePic: profilePicURL,
          createdAt: new Date(),
        };
  
        if (userType === "volunteer") {
          userData.skills = skills;
          userData.preferredArea = preferredArea;
          userData.availability = availability;
          userData.experience = experience;
        } else if (userType === "ngo") {
          userData.ngoName = ngoName;
          userData.registrationNumber = registrationNumber;
          userData.organizationType = organizationType;
          userData.cause = cause;
          userData.website = website;
          userData.contactPerson = contactPerson;
        }
  
        // Store data in Firestore
        const collectionName = userType === "ngo" ? "ngos" : "volunteers";
        await addDoc(collection(db, collectionName), userData);
  
        alert("Registration successful!");
        console.log("User registered:", user.uid);
      } catch (error) {
        alert(`Error: ${error.message}`);
        console.error(error);
      }
    });
  





