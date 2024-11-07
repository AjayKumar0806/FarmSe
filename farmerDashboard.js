// Function to handle section visibility
function showSection(sectionId) {
    // Hide all sections except the form section
    document.querySelectorAll('.section').forEach(section => {
        if (section.id !== 'formSection') {
            section.style.display = 'none';
        }
    });

    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
}

// Toggle form section visibility when the plus icon is clicked
document.querySelector('.add-product-card').addEventListener('click', function() {
    const formSection = document.getElementById('formSection');
    // Toggle the display of formSection
    if (formSection.style.display === 'block') {
        formSection.style.display = 'none';
    } else {
        formSection.style.display = 'block';
    }
});

// DOM Elements
const addProductBtn = document.getElementById("addProductBtn");
const formSection = document.getElementById("formSection");
const productForm = document.getElementById("productForm");
const productDisplay = document.getElementById("productDisplay");
const formTitle = document.getElementById("formTitle");
const formSubmitBtn = document.getElementById("formSubmitBtn");

// State for edit mode
let editingProduct = null;

// Show form to add a new crop
addProductBtn.addEventListener("click", () => {
    formSection.style.display = "block";
    formTitle.innerText = "Add New Crop";
    formSubmitBtn.innerText = "Add Crop";
    productForm.reset();
    editingProduct = null; // Reset editing state
});

// Handle form submission for adding or editing a crop
productForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Gather form data
    const cropName = document.getElementById("productName").value;
    const cropPrice = document.getElementById("productPrice").value;
    const cropDesc = document.getElementById("productDesc").value;
    const cropImageFile = document.getElementById("productImage").files[0];
    const humidity = document.getElementById("humidity").value;
    const cropImageURL = cropImageFile ? URL.createObjectURL(cropImageFile) : "https://via.placeholder.com/100";

    // If editing, update the existing product card
    if (editingProduct) {
        editingProduct.querySelector(".crop-image").src = cropImageURL;
        editingProduct.querySelector(".crop-name").innerText = cropName;
        editingProduct.querySelector(".crop-price").innerText = `Price: ₹${cropPrice}`;
        editingProduct.querySelector(".crop-humidity").innerText = `Humidity: ${humidity}%`;
        editingProduct.querySelector(".crop-desc").innerText = cropDesc;
    } else {
        // Create new crop card if adding
        const cropCard = document.createElement("div");
        cropCard.classList.add("product-card");

        cropCard.innerHTML = `
            <img src="${cropImageURL}" alt="Crop Image" class="crop-image">
            <h3 class="crop-name">${cropName}</h3>
            <p class="crop-price">Price: ₹${cropPrice}</p>
            <p class="crop-humidity">Humidity: ${humidity}%</p>
            <p class="crop-desc">Description: ${cropDesc}</p>
            <div class="product-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        // Attach edit and delete functionality
        cropCard.querySelector(".edit-btn").addEventListener("click", () => editCrop(cropCard));
        cropCard.querySelector(".delete-btn").addEventListener("click", () => deleteCrop(cropCard));

        // Add new crop card to the display section
        productDisplay.appendChild(cropCard);
    }

    // Reset form and hide
    productForm.reset();
    formSection.style.display = "none";
    editingProduct = null; // Reset editing state
});

// Function to edit a crop
function editCrop(cropCard) {
    formSection.style.display = "block";
    formTitle.innerText = "Edit Crop";
    formSubmitBtn.innerText = "Save Changes";
    editingProduct = cropCard; // Set the crop card as currently being edited

    // Populate form with crop data
    document.getElementById("productName").value = cropCard.querySelector(".crop-name").innerText;
    document.getElementById("productPrice").value = cropCard.querySelector(".crop-price").innerText.replace("Price: ₹", "");
    document.getElementById("productDesc").value = cropCard.querySelector(".crop-desc").innerText.replace("Description: ", "");
    document.getElementById("humidity").value = cropCard.querySelector(".crop-humidity").innerText.replace("Humidity: ", "").replace("%", "");
}

// Function to delete a crop
function deleteCrop(cropCard) {
    productDisplay.removeChild(cropCard); // Remove crop card from the display section
}



// Event listeners for navigation buttons
document.getElementById('profileBtn').addEventListener('click', function() {
    showSection('profileSection');
});

document.getElementById('addProductBtn').addEventListener('click', function() {
    showSection('addProductSection');
});

document.getElementById('orderSectionBtn').addEventListener('click', function() {
    showSection('orderSection');
});

// Logout function with confirmation modal
document.getElementById('logoutBtn').addEventListener('click', function() {
    if (confirm("Are you sure you want to logout?")) {
        alert("You have been logged out successfully!");
        window.location.href = 'index.html';  // Navigate to the logout page
    }
});












