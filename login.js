// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJZbKFfszv9mWpzaKiXg_mMeUxhD8UPZE",
  authDomain: "farmse-2cd34.firebaseapp.com",
  databaseURL: "https://farmse-2cd34-default-rtdb.firebaseio.com",
  projectId: "farmse-2cd34",
  storageBucket: "farmse-2cd34.appspot.com",
  messagingSenderId: "1008873211370",
  appId: "1:1008873211370:web:bd24b946ee500354e21e93",
  measurementId: "G-3CWS4Y21RB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to handle login for Farmers
document.getElementById("loginFarmerBtn").addEventListener('click', async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const farmerRef = ref(db, 'FarmerReg/' + username);
        const snapshot = await get(farmerRef);

        if (snapshot.exists()) {
            const userData = snapshot.val();
            const storedPassword = userData.password;

            if (password === storedPassword) {
                alert("Farmer login successful!");
                localStorage.setItem("username", username);
                window.location.href = "farmerDashboard.html"; // Updated redirect
            } else {
                alert("Incorrect password!");
            }
        } else {
            alert("Farmer does not exist!");
        }
    } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed. Please check the console for details.");
    }
});

// Function to handle login for Buyers
document.getElementById("loginBuyerBtn").addEventListener('click', async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const buyerRef = ref(db, 'buyers/' + username);
        const snapshot = await get(buyerRef);

        if (snapshot.exists()) {
            const userData = snapshot.val();
            const storedPassword = userData.password;

            if (password === storedPassword) {
                alert("Buyer login successful!");
                localStorage.setItem("username", username);
                window.location.href = "buyerDashboard.html"; // Updated redirect
            } else {
                alert("Incorrect password!");
            }
        } else {
            alert("Buyer does not exist!");
        }
    } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed. Please check the console for details.");
    }
});
