import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAJZbKFfszv9mWpzaKiXg_mMeUxhD8UPZE",
  authDomain: "farmse-2cd34.firebaseapp.com",
  projectId: "farmse-2cd34",
  storageBucket: "farmse-2cd34.appspot.com",
  messagingSenderId: "1008873211370",
  appId: "1:1008873211370:web:bd24b946ee500354e21e93",
  measurementId: "G-3CWS4Y21RB"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

var phoneNo = "+91 9999999999";
var address = "Null";
var Name = '';

// Fetch buyers from Firebase
async function fetchBuyers() {
  const dbRef = ref(database);
  const buyers = [];

  const uname = localStorage.getItem("username");
  

  const userRef = ref(database, 'FarmerReg/' + uname); // Adjust the path according to your data structure
  get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      phoneNo = data.phone || '';
      address = data.address1 || '';
      Name = data.name || '';
      console.log(Name);
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

 
  


  try {
    const snapshot = await get(child(dbRef, 'buyers'));
    if (snapshot.exists()) {
      snapshot.forEach((buyerSnapshot) => {
        const buyerData = buyerSnapshot.val();
        buyerData.username = buyerSnapshot.key; // Store username as a field
        // buyerData.email = buyerSnapshot.key;
        // console.log(buyerData);
        buyers.push(buyerData);
      });
    }
  } catch (error) {
    console.error("Error fetching buyers:", error);
  }

  return buyers;
}

// Display buyers in the UI
function displayBuyers(buyers) {
  const buyerList = document.getElementById("buyerList");
  buyerList.innerHTML = ""; // Clear existing content
  buyers.forEach(buyer => {
    const cropRequirements = buyer.cropRequirements || {};

    Object.keys(cropRequirements).forEach(cropKey => {
      const cropData = cropRequirements[cropKey];
      const buyerCard = `
        <div class="col-md-4 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${buyer.companyName}</h5>
              <p class="card-text"><strong>Crop Type:</strong> ${cropData.cropType}</p>
              <p class="card-text"><strong>Quantity:</strong> ${cropData.quantity}</p>
              <p class="card-text"><strong>Delivery Date:</strong> ${cropData.deliveryDate}</p>
              <p class="card-text"><strong>Additional Notes:</strong> ${cropData.additionalNotes}</p>
              <button class="btn btn-connect" onclick=connectWithBuyer('${buyer.username}','${buyer.email}','${Name}','${phoneNo}','${address}') >Connect</button>
            </div>
          </div>
        </div>
      `;
      buyerList.insertAdjacentHTML("beforeend", buyerCard);
    });
  });
}

// Search buyers with Firebase integration
async function searchBuyers() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const allBuyers = await fetchBuyers();

  // Filter buyers based on search criteria
  const filteredBuyers = allBuyers.filter(buyer =>
    buyer.username.toLowerCase().includes(searchValue) ||
    Object.values(buyer.cropRequirements || {}).some(crop =>
      crop.cropType.toLowerCase().includes(searchValue)
    )
  );

  displayBuyers(filteredBuyers);
}

document.getElementById("searchBtn").addEventListener("click", async function() {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
    section.style.display = 'none'; // Hide all sections
  });
  document.getElementById("buyerSearchSection").classList.add('active');
  document.getElementById("buyerSearchSection").style.display = 'block'; // Show buyer search section
  const buyers = await fetchBuyers();
  displayBuyers(buyers); // Display all buyers initially
});



// Trigger search on "Enter" key press
document.getElementById("searchInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    searchBuyers();
  }
});
