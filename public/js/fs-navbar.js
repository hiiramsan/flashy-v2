const dropdownBtn = document.getElementById("dropdownBtn");
const dropdownContainer = document.querySelector(".dropdown-container");
const optionsBtn = document.getElementById("optionsBtn"); 
const optionsMenu = document.querySelector(".options-menu"); 

dropdownBtn.addEventListener("click", function () {
  dropdownContainer.classList.toggle("show");
  toggleBlur();
});

optionsBtn.addEventListener("click", function () {
  optionsMenu.classList.toggle("show");
  toggleBlur();
});

document.addEventListener("click", function (event) {
  if (!dropdownContainer.contains(event.target) && !dropdownBtn.contains(event.target)) {
    if (!dropdownContainer.contains(event.target) && !dropdownBtn.contains(event.target)) {
      dropdownContainer.classList.remove("show");
      toggleBlur(); 
    }
  }

  if (!optionsMenu.contains(event.target) && !optionsBtn.contains(event.target)) {
    optionsMenu.classList.remove("show");
    toggleBlur(); 
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    dropdownContainer.classList.remove("show");
    optionsMenu.classList.remove("show");
    toggleBlur(); 
  }
});

document.getElementById('close-options').addEventListener('click', function () {
  optionsMenu.classList.remove("show");
  toggleBlur(); 
});

function toggleBlur() {
  const body = document.body; 
  const dropdownOpen = dropdownContainer.classList.contains("show");
  const optionsOpen = optionsMenu.classList.contains("show");
  
  if (dropdownOpen || optionsOpen) {
    // document.body.classList.add("blur");
    overlay.style.display = 'block';
  } else {
    // document.body.classList.remove("blur");
    overlay.style.display = 'none';
  }
}