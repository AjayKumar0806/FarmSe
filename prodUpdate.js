// Import the Firebase SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, set, ref, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

// Function to get profile data from Firebase
// export function getProfileData(userId) {
//     const userRef = ref(database, 'users/' + userId);
//     return get(userRef).then((snapshot) => {
//         if (snapshot.exists()) {
//             return snapshot.val();
//         } else {
//             console.log("No data available");
//             return null;
//         }
//     }).catch((error) => {
//         console.error("Error fetching data: ", error);
//     });
// }

// Function to save profile data to Firebase
export function saveProfileData(userId, name, email, address) {
    const userRef = ref(database, 'users/' + userId);
    set(userRef, {
        name: name,
        email: email,
        address: address
    }).then(() => {
        alert('Profile saved successfully.');
    }).catch((error) => {
        alert('Failed to save profile: ' + error.message);
    });
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    const userId = 'user_123'; // Replace with the actual user ID
    getProfileData(userId).then((data) => {
        if (data) {
            document.getElementById('name').value = data.name || '';
            document.getElementById('email').value = data.email || '';
            document.getElementById('address').value = data.address || '';
        }
    });

    // Edit profile button click event
    document.querySelector('.btn-edit-profile').addEventListener('click', function () {
        // Enable profile fields for editing
        document.querySelectorAll('#profileForm input').forEach(input => input.disabled = false);
        // Show save button and hide edit button
        document.querySelector('.btn-save-profile').style.display = 'inline-block';
        this.style.display = 'none';
    });

    // Save profile button click event
    document.querySelector('.btn-save-profile').addEventListener('click', function () {
        if (document.getElementById('profileForm').checkValidity()) {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const address = document.getElementById('address').value;
            saveProfileData(userId, name, email, address);

            // Disable profile fields after saving
            document.querySelectorAll('#profileForm input').forEach(input => input.disabled = true);
            // Show edit button and hide save button
            document.querySelector('.btn-edit-profile').style.display = 'inline-block';
            this.style.display = 'none';
        } else {
            // If form is invalid, prevent default form submission
            event.preventDefault();
            event.stopPropagation();
            // Mark invalid fields
            document.getElementById('profileForm').classList.add('was-validated');
        }
    });
});


