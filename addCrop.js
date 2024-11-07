// Import the Firebase SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, update, remove, onValue, set, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

// Assume the username is stored in localStorage
const uname = localStorage.getItem("username");

// References
const productsRef = ref(database, `FarmReg/${uname}/products`);

// DOM Elements
// DOM Elements
const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const productDescInput = document.getElementById("productDesc");
const productImageInput = document.getElementById("productImage");
const humidityInput = document.getElementById("humidity");
const productIdInput = document.getElementById("productId");
const formSubmitBtn = document.getElementById("formSubmitBtn");
const productDisplay = document.getElementById("productDisplay");
const formSection = document.getElementById('formSection');
const addProductBtn = document.getElementById('addProductBtn');

// Event listener for Add Product button
addProductBtn.addEventListener('click', () => {
  resetForm();
  formSection.classList.toggle('active');  // Show the form section for adding/updating products
  formSection.classList.toggle('hidden');  // Ensure the form section displays when needed
});

// Function to show a specific section
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';

  // Ensure product display section and add button are visible in "Products" section
  if (sectionId === 'addProductSection') {
    addProductBtn.style.display = 'block'; // Show the Add Product button
    formSection.classList.add('hidden');  // Hide form section by default
  }
}

// Load products on page load
window.onload = () => {
  initializeProductsKey();
  loadProducts();
};

// Modify existing function for showing add product form
function resetForm() {
  document.getElementById("productForm").reset();
  formSubmitBtn.innerText = "Add Crop";
  document.getElementById("formTitle").innerText = "Add New Crop";
  formSection.classList.add('hidden'); // Ensure form section is hidden after reset
}

// Event listeners for navigation buttons
document.getElementById('profileBtn').addEventListener('click', () => {
  showSection('profileSection');
});

document.getElementById('addProductNavBtn').addEventListener('click', () => {
  showSection('addProductSection');
});

document.getElementById('orderNavBtn').addEventListener('click', () => {
  showSection('orderSection');
});
