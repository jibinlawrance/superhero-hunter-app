const navButton = document.querySelector('[data-bs-target="#navbarSupportedContent"]');
const mobileNav = document.querySelector('.navbar-nav');

// mobile navbar
navButton.addEventListener("click", () => mobileNav.classList.toggle("hidden"));

// Function to be executed when the window is resized
function handleWindowResize() {
  // Get the current window width
  var windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  // Check if the window width is 768px or higher
  if (windowWidth >= 768) {
    mobileNav.classList.remove("hidden");
  }
}

// Attach the event listener to the window's resize event
window.addEventListener("resize", handleWindowResize);