function toggleNav() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("show");
}

window.addEventListener("scroll", () => {
  const welcome = document.getElementById("welcome");
  if (window.scrollY > 100) {
    welcome.classList.add("hidden");
  } else {
    welcome.classList.remove("hidden");
  }
});

const products = [
  { name: "Wheat", price: 800 },
  { name: "Rice", price: 900 },
  { name: "Maize", price: 750 },
  { name: "Pulses", price: 700 },
  { name: "Urea", price: 300 },
  { name: "DAP", price: 450 },
  { name: "Potash", price: 550 },
  { name: "Mustard", price: 950 },
  { name: "Sunflower", price: 870 },
  { name: "Cotton", price: 1200 },
  { name: "Groundnut", price: 1100 },
  { name: "Zinc Sulphate", price: 320 }
];


const fertilizerData = [
  { name: "Urea", price: 300 },
  { name: "DAP", price: 450 },
];

const soilDescriptions = {
  "clay": "Heavy soil with high nutrient content. Good for rice.",
  "sandy": "Drains quickly. Ideal for root vegetables.",
  "loamy": "Balanced soil ideal for most crops.",
};

const cart = [];

function displaySeeds() {
  const seedList = document.getElementById("seed-list");
  seedList.innerHTML = "";

  seedData.forEach((seed, index) => {
    const li = document.createElement("li");
    li.textContent = `${seed.name} - ₹${seed.price}`;
    const btn = document.createElement("button");
    btn.textContent = "Add to Cart";
    btn.onclick = () => addToCart(seed);
    li.appendChild(btn);
    seedList.appendChild(li);
  });

  fertilizerData.forEach(fert => {
    const li = document.createElement("li");
    li.textContent = `${fert.name} - ₹${fert.price}`;
    const btn = document.createElement("button");
    btn.textContent = "Add to Cart";
    btn.onclick = () => addToCart(fert);
    seedList.appendChild(li);
  });
}

function addToCart(item) {
  cart.push(item);
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartList = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("cart-total");
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    cartList.appendChild(li);
  });

  totalDisplay.textContent = total;
}

function fetchLocationAndSoil() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      document.getElementById("location-display").textContent = `Your location: ${lat.toFixed(2)}, ${lon.toFixed(2)}`;

      // Dummy logic for demo (in reality, connect to soil database)
      const soilTypes = ["clay", "sandy", "loamy"];
      const randomSoil = soilTypes[Math.floor(Math.random() * soilTypes.length)];

      const soilInfoDiv = document.getElementById("soil-info");
      soilInfoDiv.innerHTML = `
        <p><strong>Soil Type:</strong> ${randomSoil}</p>
        <p><strong>Description:</strong> ${soilDescriptions[randomSoil]}</p>
        <p><strong>Soil Analysis Cost:</strong> ₹250</p>
        <button onclick="addToCart({name: 'Soil Test - ${randomSoil}', price: 250})">Add to Cart</button>
      `;
    });
  } else {
    document.getElementById("location-display").textContent = "Geolocation not supported.";
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
        const data = await response.json();
        const displayName = data.display_name;
        document.querySelector(".navbar").insertAdjacentHTML("beforeend", `<div class="location">📍 ${displayName}</div>`);
      } catch (err) {
        console.error("Reverse geocoding failed", err);
      }
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}


// Initialize
displaySeeds();
fetchLocationAndSoil();
