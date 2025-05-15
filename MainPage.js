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
    