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

document.getElementById("soilForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const color = form.color.value;
  const texture = form.texture.value;
  const drainage = form.drainage.value;
  const ph = parseFloat(form.ph.value);

  let soilType = "Unknown";
  let cropSuggestion = [];

  if (color === "black" && texture === "clayey") {
    soilType = "Black Soil";
    cropSuggestion = ["Cotton", "Soybean", "Jowar"];
  } else if (color === "red" && texture === "sandy") {
    soilType = "Red Soil";
    cropSuggestion = ["Millets", "Groundnut", "Pulses"];
  } else if (color === "yellow" && texture === "loamy") {
    soilType = "Laterite Soil";
    cropSuggestion = ["Tea", "Coffee", "Cashew"];
  } else if (color === "alluvial" && texture === "silty") {
    soilType = "Alluvial Soil";
    cropSuggestion = ["Wheat", "Rice", "Sugarcane", "Maize"];
  } else if (color === "laterite" && texture === "loamy") {
    soilType = "Laterite Soil";
    cropSuggestion = ["Tea", "Rubber", "Coffee"];
  }

  // 🌱 Seasonal Crop Suggestion Based on Current Month
  const month = new Date().getMonth(); // 0 = Jan
  let seasonalCrops = [];

  if ([3, 4, 5].includes(month)) { // April–June
    seasonalCrops = ["Groundnut", "Millets", "Green Gram"];
  } else if ([6, 7, 8].includes(month)) { // July–September
    seasonalCrops = ["Paddy", "Maize", "Bajra"];
  } else if ([9, 10, 11].includes(month)) { // October–December
    seasonalCrops = ["Wheat", "Barley", "Mustard"];
  } else { // January–March
    seasonalCrops = ["Potato", "Carrot", "Peas"];
  }

  let phComment = "";
  if (ph < 5.5) {
    phComment = "Soil is acidic. Consider liming.";
  } else if (ph > 8) {
    phComment = "Soil is alkaline. Consider gypsum application.";
  } else {
    phComment = "Soil pH is ideal for most crops.";
  }

  document.getElementById("result").innerHTML = `
    <h3>Soil Analysis Report</h3>
    <p><strong>Soil Type:</strong> ${soilType}</p>
    <p><strong>Suggested Crops:</strong> ${cropSuggestion.join(", ") || "Please consult an expert for this combination."}</p>
    <p><strong>pH Insight:</strong> ${phComment}</p>
    <p><strong>🌾 Best Crops for This Season:</strong> ${seasonalCrops.join(", ")}</p>
  `;

  downloadBtn.style.display = "inline-block";
});

// 🧾 Download Button Logic
const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", () => {
  window.print();
});