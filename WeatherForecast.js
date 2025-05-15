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

  let voiceEnabled = false; // Track whether voice is enabled

  function toggleVoice() {
      voiceEnabled = !voiceEnabled;
      const toggleBtn = document.getElementById("toggleVoiceBtn");
      toggleBtn.innerText = voiceEnabled ? "Disable Voice" : "Enable Voice";
  }
  
  function getRecommendation(temp, description) {
      if (temp >= 30 && description.includes("clear")) {
          return "It's hot and clear. Water your crops.";
      } else if (temp < 20 && description.includes("rain")) {
          return "Rainy and cool — a good time to sow new crops.";
      } else if (temp > 25 && description.includes("cloud")) {
          return "Cloudy but warm — consider fertilizing your crops.";
      } else if (temp >= 20 && temp <= 30) {
          return "Conditions are moderate — ideal for reaping mature crops.";
      } else {
          return "Conditions aren't optimal — monitor and wait.";
      }
  }
  
  function formatTime() {
      const now = new Date();
      return now.toLocaleString();
  }
  
  function speakText(text) {
      if (!voiceEnabled) return;
  
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-US";
      window.speechSynthesis.speak(speech);
  }
  
  async function getWeather() {
      const location = document.getElementById("locationInput").value;
      const result = document.getElementById("weatherResult");
  
      if (!location) {
          result.innerText = "Please enter a location.";
          return;
      }
  
      const apiKey = "7aa3dd67e473212297f01ab152ad4c57";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  
      try {
          const response = await fetch(url);
          if (!response.ok) {
              result.innerText = "Location not found. Please try again.";
              return;
          }
  
          const data = await response.json();
          const temp = data.main.temp;
          const description = data.weather[0].description;
          const city = data.name;
          getForecast(city); // Fetch and show 5-day forecast
          const country = data.sys.country;
          const timestamp = formatTime();
          const advice = getRecommendation(temp, description);
  
          // Clear previous result
          result.innerHTML = "";
  
          // Create info box
          const infoBox = document.createElement("div");
          infoBox.style.padding = "15px";
          infoBox.style.marginTop = "20px";
          infoBox.style.border = "1px solid #ccc";
          infoBox.style.borderRadius = "10px";
          infoBox.style.background = "#f5f5f5";
  
          infoBox.innerHTML = `
              <h3>Weather Report for ${city}, ${country}</h3>
              <p>Requested at: <strong>${timestamp}</strong></p>
              <p>Temperature: <strong>${temp}°C</strong></p>
              <p>Condition: <strong>${description}</strong></p>
              <hr>
              <p>Recommendation: <strong>${advice}</strong></p>
          `;
  
          result.appendChild(infoBox);
  
          // Speak the text
          const spokenText = `
              Weather in ${city}, ${country}. 
              Temperature: ${temp} degrees Celsius. 
              Condition: ${description}. 
              Recommendation: ${advice}. 
              The request was made at ${timestamp}.
          `;
          speakText(spokenText);
  
          // ✅ Add to table history
          const table = document.getElementById("historyTable").getElementsByTagName('tbody')[0];
          const newRow = table.insertRow();
  
          newRow.innerHTML = `
              <td>${timestamp}</td>
              <td>${city}, ${country}</td>
              <td>${temp}°C</td>
              <td>${description}</td>
              <td>${advice}</td>
          `;

        // 🌍 Show Map
const lat = data.coord.lat;
const lon = data.coord.lon;

// Clear existing map instance if any
if (window.weatherMap) {
    window.weatherMap.remove();
}

// Initialize new map
window.weatherMap = L.map('map').setView([lat, lon], 10);

// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(weatherMap);

// Add marker
L.marker([lat, lon]).addTo(weatherMap)
    .bindPopup(`<b>${city}, ${country}</b><br>Weather: ${description}<br>Temp: ${temp}°C`)
    .openPopup();
  
      } catch (error) {
          console.error("Fetch error:", error);
          result.innerText = "An error occurred. Please try again later.";
      }

      async function getForecast(city) {
        const apiKey = "7aa3dd67e473212297f01ab152ad4c57"; // your key
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
    
            const forecastContainer = document.getElementById("forecastContainer");
            forecastContainer.innerHTML = "";
    
            // Get one forecast per day (every 8 steps in the list)
            for (let i = 0; i < data.list.length; i += 8) {
                const entry = data.list[i];
                const date = new Date(entry.dt_txt).toLocaleDateString();
                const temp = entry.main.temp;
                const description = entry.weather[0].description;
                const icon = entry.weather[0].icon;
    
                const forecastHTML = `
                    <div>
                        <strong>${date}</strong>
                        <br>
                        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
                        <br>
                        ${temp.toFixed(1)}°C
                        <br>
                        ${description}
                    </div>
                `;
                forecastContainer.innerHTML += forecastHTML;
            }
    
        } catch (error) {
            console.error("Forecast error:", error);
        }
    }
    
      

  }

