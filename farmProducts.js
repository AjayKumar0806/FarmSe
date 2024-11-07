// Import the Firebase SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, set, push, remove, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

// Function to ensure "Products" key exists
function initializeProductsKey() {
    const productsRef = ref(database, `FarmerReg/${uname}/Products`);
    get(productsRef).then((snapshot) => {
        if (!snapshot.exists()) {
            set(productsRef, {}).then(() => {
                console.log("Initialized 'Products' section successfully.");
            }).catch((error) => {
                console.error("Error initializing 'Products' section:", error);
            });
        } else {
            console.log("'Products' section already exists.");
        }
    }).catch((error) => {
        console.error("Error checking 'Products' section:", error);
    });
}

// Handle adding a new crop
function addNewCrop(crop) {
    const productsRef = ref(database, `FarmerReg/${uname}/Products`);
    push(productsRef, crop).then(() => {
        console.log("New crop added successfully.");
        displayProducts(); // Refresh product display
    }).catch((error) => {
        console.error("Error adding new crop:", error);
    });
}

// Handle deleting a product
function deleteProduct(productId) {
    const productRef = ref(database, `FarmerReg/${uname}/Products/${productId}`);
    remove(productRef).then(() => {
        console.log("Product deleted successfully.");
        displayProducts(); // Refresh product display
    }).catch((error) => {
        console.error("Error deleting product:", error);
    });
}

// Handle editing a product
function editProduct(productId, updatedCrop) {
    const productRef = ref(database, `FarmerReg/${uname}/Products/${productId}`);
    update(productRef, updatedCrop).then(() => {
        console.log("Product updated successfully.");
        displayProducts(); // Refresh product display
    }).catch((error) => {
        console.error("Error updating product:", error);
    });
}

// Function to display products
function displayProducts() {
    const productsRef = ref(database, `FarmerReg/${uname}/Products`);
    const productDisplay = document.getElementById('productDisplay');
    
    // Clear existing products
    productDisplay.innerHTML = '';

    get(productsRef).then((snapshot) => {
        if (snapshot.exists()) {
            const products = snapshot.val();
            for (const productId in products) {
                const crop = products[productId];
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${crop.image || 'default-image-url.png'}" alt="${crop.name}" class="product-image">
                    <div class="product-details">
                        <h3>${crop.name}</h3>
                        <p class="price">₹${crop.price}</p>
                        <p class="description">${crop.description}</p>
                        <p class="humidity">Humidity: ${crop.humidity}%</p>
                        <button class="btn btn-primary editBtn" onclick="openEditForm('${productId}', '${crop.name}', '${crop.price}', '${crop.description}', '${crop.humidity}')">Edit</button>
                        <button class="btn btn-danger deleteBtn" onclick="confirmDeleteProduct('${productId}')">Delete</button>
                    </div>
                `;
                productDisplay.appendChild(productCard);
            }
        } else {
            console.log("No products found.");
            productDisplay.innerHTML = '<p>No products available.</p>';
        }
    }).catch((error) => {
        console.error("Error fetching products:", error);
    });
}

// Open edit form and populate fields
function openEditForm(productId, name, price, description, humidity) {
    document.getElementById('productName').value = name;
    document.getElementById('productPrice').value = price;
    document.getElementById('productDesc').value = description;
    document.getElementById('humidity').value = humidity;

    // Change form submit action to edit
    document.getElementById('formSubmitBtn').onclick = function (e) {
        e.preventDefault();
        const updatedCrop = {
            name: document.getElementById('productName').value,
            price: document.getElementById('productPrice').value,
            description: document.getElementById('productDesc').value,
            humidity: document.getElementById('humidity').value,
        };
        editProduct(productId, updatedCrop);
        document.getElementById('productForm').reset();
    };
}

// Confirm deletion of a product
function confirmDeleteProduct(productId) {
    if (confirm("Are you sure you want to delete this product?")) {
        deleteProduct(productId);
    }
}

// Initialize "Products" on window load
window.onload = function () {
    initializeProductsKey();
    displayProducts();

    const productForm = document.getElementById("productForm");
    
    // Handle form submission
    productForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form values
        const productName = document.getElementById("productName").value;
        const productPrice = document.getElementById("productPrice").value;
        const productDesc = document.getElementById("productDesc").value;
        const productImage = document.getElementById("productImage").files[0];
        const humidity = document.getElementById("humidity").value;

        // Create crop object
        const crop = {
            name: productName,
            price: productPrice,
            description: productDesc,
            humidity: humidity,
            image: '' // Placeholder for image URL
        };

        // Use FileReader to preview the image
        const reader = new FileReader();
        reader.onload = function (event) {
            crop.image = event.target.result; // Store image data in crop object
            
            // Create new product card
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <img src="${event.target.result}" alt="${productName}" class="product-image">
                <div class="product-details">
                    <h3>${productName}</h3>
                    <p class="price">₹${productPrice}</p>
                    <p class="description">${productDesc}</p>
                    <p class="humidity">Humidity: ${humidity}%</p>
                </div>
            `;

            // Add the card to the product display
            productDisplay.appendChild(productCard);
            addNewCrop(crop); // Push the crop to Firebase
        };

        reader.readAsDataURL(productImage);

        // Reset form after adding product
        productForm.reset();
    });

    // Add event listeners for navigation buttons
    document.getElementById('addProductNavBtn').addEventListener('click', () => {
        showSection('addProductSection');
    });

    document.getElementById('profileBtn').addEventListener('click', () => {
        showSection('profileSection');
    });

    document.getElementById('orderNavBtn').addEventListener('click', () => {
        showSection('orderSection');
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
        if (confirm("Are you sure you want to logout?")) {
            alert("You have been logged out successfully!");
            window.location.href = 'index.html';  // Redirect to login page
        }
    });
};

// Function to show a specific section
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active'); // Hide all sections
    });
    document.getElementById(sectionId).classList.add('active'); // Show selected section
}
