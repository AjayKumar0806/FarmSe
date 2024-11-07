import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, get, push, update, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getStorage, uploadBytes, getDownloadURL, ref as storageRef } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

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
const db = getDatabase(app);
const storage = getStorage(app);

// Toggle edit mode
function toggleEditMode() {
  const profileView = document.getElementById("profileView");
  const profileForm = document.getElementById("profileForm");
  profileView.style.display = profileView.style.display === "none" ? "block" : "none";
  profileForm.style.display = profileForm.style.display === "none" ? "block" : "none";
}

// Save profile data to Firebase
async function saveProfile(event) {
  event.preventDefault();
  
  const username = localStorage.getItem("username");
  if (!username) {
    alert("Username not found in localStorage.");
    return;
  }

  const companyName = document.getElementById("companyName").value.trim();
  const email = document.getElementById("userEmail").value.trim();
  const mobile = document.getElementById("userMobile").value.trim();
  const address = document.getElementById("userAddress").value.trim();
  const imageFile = document.getElementById("profileImage").files[0];

  const updatedData = {};
  
  if (companyName) updatedData.companyName = companyName;
  if (email) updatedData.email = email;
  if (mobile) updatedData.phone = mobile;
  if (address) updatedData.address = address;
  
  try {
    if (imageFile) {
      const imageRef = storageRef(storage, 'profile_images/' + username);
      const snapshot = await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(snapshot.ref);
      updatedData.profileImage = imageUrl;
    }

    if (Object.keys(updatedData).length > 0) {
      await update(ref(db, 'buyers/' + username), updatedData);
      alert("Profile updated successfully!");
      loadProfile(username);
      toggleEditMode();
    } else {
      alert("No changes to update.");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Failed to update profile. Please try again.");
  }
}

// Save crop requirements under the buyer's node in Firebase
async function saveCropRequirement(event) {
  event.preventDefault();

  const username = localStorage.getItem("username");
  if (!username) {
    alert("Username not found in localStorage.");
    return;
  }

  const cropType = document.getElementById("cropType").value;
  const quantity = document.getElementById("quantity").value;
  const deliveryDate = document.getElementById("deliveryDate").value;
  const additionalNotes = document.getElementById("additionalNotes").value;

  try {
    const cropRef = ref(db, `buyers/${username}/cropRequirements`);
    const newCropRef = push(cropRef);

    await set(newCropRef, {
      cropType: cropType,
      quantity: quantity,
      deliveryDate: deliveryDate,
      additionalNotes: additionalNotes
    });

    alert("Crop requirement submitted successfully!");
    loadCropRequirements(username);
  } catch (error) {
    console.error("Error saving crop requirement:", error);
    alert("Failed to submit crop requirement. Please try again.");
  }
}

// Edit crop requirement in Firebase
async function editCropRequirement(cropKey) {
  const username = localStorage.getItem("username");
  const cropRef = ref(db, `buyers/${username}/cropRequirements/${cropKey}`);
  
  // Prompt the user for new values
  const newCropType = prompt("Enter new crop type:");
  const newQuantity = prompt("Enter new quantity:");
  const newDeliveryDate = prompt("Enter new delivery date:");
  const newAdditionalNotes = prompt("Enter new additional notes:");

  const updatedCropData = {};

  if (newCropType) updatedCropData.cropType = newCropType;
  if (newQuantity) updatedCropData.quantity = newQuantity;
  if (newDeliveryDate) updatedCropData.deliveryDate = newDeliveryDate;
  if (newAdditionalNotes) updatedCropData.additionalNotes = newAdditionalNotes;

  try {
    await update(cropRef, updatedCropData);
    alert("Crop requirement updated successfully!");
    loadCropRequirements(username);
  } catch (error) {
    console.error("Error updating crop requirement:", error);
    alert("Failed to update crop requirement. Please try again.");
  }
}

// Delete crop requirement from Firebase
async function deleteCropRequirement(cropKey) {
  const username = localStorage.getItem("username");
  const cropRef = ref(db, `buyers/${username}/cropRequirements/${cropKey}`);

  if (confirm("Are you sure you want to delete this crop requirement?")) {
    try {
      await remove(cropRef);
      alert("Crop requirement deleted successfully!");
      loadCropRequirements(username);
    } catch (error) {
      console.error("Error deleting crop requirement:", error);
      alert("Failed to delete crop requirement. Please try again.");
    }
  }
}

// Load profile data from Firebase
async function loadProfile(username) {
  const profileRef = ref(db, 'buyers/' + username);
  try {
    const snapshot = await get(profileRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      document.getElementById("displayName").innerText = data.companyName;
      document.getElementById("displayEmail").innerText = data.email;
      document.getElementById("displayMobile").innerText = data.phone;
      document.getElementById("displayAddress").innerText = data.address;
      document.getElementById("usernameDisplay").innerText = data.companyName; // Display company name in header

      if (data.profileImage) {
        document.getElementById("profileImg").src = data.profileImage;
      }

      // Load crop requirements if they exist
      if (data.cropRequirements) {
        loadCropRequirements(data.cropRequirements);
      }
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}

// Load crop requirements from Firebase and display in the UI
function loadCropRequirements(cropData) {
  const tbody = document.querySelector("#cropRequirementsContent tbody");
  tbody.innerHTML = "";

  for (const key in cropData) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${cropData[key].cropType}</td>
      <td>${cropData[key].quantity}</td>
      <td>${cropData[key].deliveryDate}</td>
      <td>${cropData[key].additionalNotes}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editCropRequirement('${key}')">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteCropRequirement('${key}')">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  }
}

// Expose edit and delete functions to global scope for button actions
window.editCropRequirement = editCropRequirement;
window.deleteCropRequirement = deleteCropRequirement;

// Initialize event listeners
window.onload = function() {
  const username = localStorage.getItem("username") || "SampleUser";
  loadProfile(username);
  
  document.getElementById("profileForm").addEventListener("submit", saveProfile);
  document.getElementById("cropRequirementsForm").addEventListener("submit", saveCropRequirement);
};
