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

// Initialize current month and year
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

let userSeedRecord = {
  crop: "Tomato",
  type: "Hybrid",
  suggestedDates: [10, 11, 12, 18, 19, 20] // default
};

document.getElementById("sowingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const crop = document.getElementById("cropName").value;
  const seed = document.getElementById("seedType").value;
  const date = document.getElementById("sowingDate").value;
  const field = document.getElementById("fieldNumber").value;
  const notes = document.getElementById("notes").value;

  // Add to history table
  const table = document.querySelector("#recordTable tbody");
  const row = table.insertRow();
  row.innerHTML = `
    <td>${crop}</td>
    <td>${seed}</td>
    <td>${date}</td>
    <td>${field}</td>
    <td>${notes}</td>
  `;

  // Set seed record for calendar
  const parsedDate = new Date(date);
  if (!isNaN(parsedDate)) {
    userSeedRecord = {
      crop: crop,
      type: seed,
      suggestedDates: [parsedDate.getDate(), parsedDate.getDate() + 1, parsedDate.getDate() + 2]
    };
  }

  renderCalendar(currentMonth, currentYear); // Refresh calendar
  this.reset();
});

function renderCalendar(month = currentMonth, year = currentYear) {
  currentMonth = month;
  currentYear = year;

  const calendar = document.getElementById("calendar");
  const header = document.getElementById("calendarHeader");
  calendar.innerHTML = "";

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  header.textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Add empty placeholders for starting weekday
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.classList.add("empty");
    calendar.appendChild(empty);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.textContent = i;

    // Only highlight suggested dates for current month & year
    if (
      userSeedRecord.suggestedDates.includes(i) &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
    ) {
      day.classList.add("suggested");
      day.setAttribute("data-tooltip", `🌱 Ideal to sow ${userSeedRecord.crop} (${userSeedRecord.type})`);
    }

    calendar.appendChild(day);
  }
}

// Month navigation
document.getElementById("prevMonth").addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

document.getElementById("nextMonth").addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

// Render calendar after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  renderCalendar(currentMonth, currentYear);
});
