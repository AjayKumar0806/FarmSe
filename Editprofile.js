import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJZbKFfszv9mWpzaKiXg_mMeUxhD8UPZE",
  authDomain: "farmse-2cd34.firebaseapp.com",
  projectId: "farmse-2cd34",
  storageBucket: "farmse-2cd34.appspot.com",
  messagingSenderId: "1008873211370",
  appId: "1:1008873211370:web:bd24b946ee500354e21e93",
  measurementId: "G-3CWS4Y21RB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const uname = localStorage.getItem("username");

// DOM Elements
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const addressInput = document.getElementById("address");
const saveBtn = document.getElementById("saveBtn");
const editBtn = document.getElementById("editBtn");
const imageUpload = document.getElementById("profileImageUpload");

// Get data from Firebase
function loadProfileData() {
  const userRef = ref(database, 'FarmerReg/' + uname); // Adjust the path according to your data structure
  get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      nameInput.value = data.name || '';
      emailInput.value = data.email || '';
      addressInput.value = data.address1 || '';
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

// Save data to Firebase (only updates the given fields)
function saveProfileData() {
  const userRef = ref(database, 'FarmerReg/' + uname); // Adjust the path according to your data structure
  const updatedData = {
    name: nameInput.value,
    email: emailInput.value,
    address1: addressInput.value // Adjust field name based on your database structure
  };

  // Use `update` to modify only specific fields without affecting other data
  update(userRef, updatedData).then(() => {
    console.log("Data updated successfully!");
  }).catch((error) => {
    console.error("Error updating data: ", error);
  });
}

// Event listener for Save button
saveBtn.addEventListener("click", function () {
  saveProfileData();
  // Toggle back to 'edit' mode after saving
  nameInput.disabled = true;
  emailInput.disabled = true;
  addressInput.disabled = true;
  imageUpload.style.display = "none";
  saveBtn.style.display = "none";
  editBtn.style.display = "inline-block";
});

// Edit and Save functionality
document.addEventListener("DOMContentLoaded", function () {
  // Initial load of profile data
  loadProfileData();

  // Toggle between edit and save mode
  editBtn.addEventListener("click", function () {
    nameInput.disabled = false;
    emailInput.disabled = false;
    addressInput.disabled = false;
    imageUpload.style.display = "block";
    saveBtn.style.display = "inline-block";
    editBtn.style.display = "none";
  });

  // Change profile image when user uploads a new image
  imageUpload.addEventListener("change", function (event) {
    const reader = new FileReader();
    reader.onload = function (e) {
      // Optionally, you can preview the image here if needed
      const profileImage = document.getElementById("profileImageDisplay");
      profileImage.src = e.target.result;
      
      // You may also want to save the image to Firebase Storage, but here we just handle the image display
    };
    reader.readAsDataURL(event.target.files[0]);
  });
});
