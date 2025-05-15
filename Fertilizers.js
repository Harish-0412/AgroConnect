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

  function recommendFertilizer() {
    const crop = document.getElementById("cropSelect").value;
    const output = document.getElementById("recommendation");
    let recommendation = "";
  
    switch (crop) {
        case "rice":
          recommendation = "Inorganic: Urea (100kg), DAP (50kg), MOP (30kg). Organic: Vermicompost (2 tons), Neem Cake (200kg).";
          break;
        case "wheat":
          recommendation = "Inorganic: Urea (120kg), DAP (60kg). Organic: Farmyard Manure (FYM) 3 tons, Azospirillum culture.";
          break;
        case "cotton":
          recommendation = "Inorganic: Urea (90kg), DAP (45kg), MOP (35kg). Organic: Compost (2.5 tons), Panchagavya spray.";
          break;
        case "sugarcane":
          recommendation = "Inorganic: Urea (150kg), DAP (80kg), MOP (50kg). Organic: Press mud (3 tons), Green manure.";
          break;
        case "maize":
          recommendation = "Inorganic: Urea (130kg), DAP (70kg). Organic: Jeevamrut spray, Compost (2 tons).";
          break;
        case "potato":
          recommendation = "Inorganic: Urea (110kg), DAP (55kg), MOP (60kg). Organic: Bone meal, Vermicompost.";
          break;
        case "tomato":
          recommendation = "Inorganic: Urea (60kg), DAP (50kg), MOP (40kg). Organic: Cow dung compost, Fish amino acids.";
          break;
        case "banana":
          recommendation = "Inorganic: Urea (200g/tree), DAP (150g/tree), MOP (150g/tree). Organic: Neem cake, Jeevamrut.";
          break;
        case "onion":
          recommendation = "Inorganic: Urea (80kg), DAP (40kg). Organic: FYM (2 tons), Mustard cake.";
          break;
        case "groundnut":
          recommendation = "Inorganic: Gypsum (250kg), SSP (Super Phosphate). Organic: Rhizobium inoculation, Compost.";
          break;
        case "millet":
          recommendation = "Inorganic: Urea (70kg), DAP (35kg). Organic: Vermicompost, Biofertilizer mix.";
          break;
        default:
          recommendation = "";
      }
    
      if (recommendation) {
        output.style.display = "block";
        output.innerText = recommendation;
      } else {
        output.style.display = "none";
      }
}

