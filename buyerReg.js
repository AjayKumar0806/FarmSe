// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Your web app's Firebase configuration
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
const analytics = getAnalytics(app);
const db = getDatabase(app); // Get a reference to the database service

// Handle form submission for buyer registration
document.getElementById('regBtn').addEventListener('click', async (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get form data
  const buyerType = document.getElementById('buyerType')?.value || "";
  const companyName = document.getElementById('companyName')?.value || "";
  const username = document.getElementById('username')?.value || "";
  const password = document.getElementById('password')?.value || "";
  const email = document.getElementById('email')?.value || "";
  const phone = document.getElementById('phone')?.value || "";
  const gstNumber = document.getElementById('gstNumber')?.value || "";
  const address = document.getElementById('address')?.value || "";
  const city = document.getElementById('city')?.value || "";
  const state = document.getElementById('state')?.value || "";
  const zip = document.getElementById('zip')?.value || "";
  const productType = Array.from(document.getElementById('productType')?.selectedOptions || []).map(option => option.value);

  // Validate essential fields
  if (!username || !email || !password) {
    alert("Please fill in all required fields.");
    return;
  }

  // Add data to "buyers" node
  try {
    await set(ref(db, 'buyers/' + username), {
      buyerType: buyerType,
      companyName: companyName,
      username: username,
      password: password, // Remember to hash passwords in a real app
      email: email,
      phone: phone,
      gstNumber: gstNumber,
      address: address,
      city: city,
      state: state,
      zip: zip,
      productType: productType
    });

    alert("Buyer data added successfully!");
    // Reset the form after successful submission
    document.getElementById('registrationForm').reset(); // Corrected reset function
  } catch (error) {
    console.error("Error adding buyer data: ", error);
    alert("Error adding buyer data. Please try again.");
  }
});
