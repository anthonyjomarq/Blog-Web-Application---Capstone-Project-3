export function initLightbox() {
  const images = document.querySelectorAll(".clickable-image");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.querySelector(".lightbox-image");
  const closeButton = document.querySelector(".lightbox-close");

  // Set up click handler for each image
  images.forEach((image) => {
    image.addEventListener("click", () => {
      lightboxImage.src = image.dataset.fullsize;
      lightbox.style.display = "flex";
      document.body.style.overflow = "hidden"; // Prevent scrolling
    });
  });

  // Close lightbox when close button is clicked
  closeButton.addEventListener("click", () => {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // Close lightbox when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Keyboard accessibility
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.style.display === "flex") {
      lightbox.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
}

/**
 * Initializes dark mode toggle functionality
 */
export function initDarkMode() {
  const themeSwitch = document.getElementById("theme-switch");

  // Toggle dark mode class on click
  themeSwitch.addEventListener("click", () => {
    document.body.classList.toggle("darkmode");
    localStorage.setItem(
      "darkmode",
      document.body.classList.contains("darkmode") ? "active" : "inactive"
    );
  });

  // Initialize theme based on stored preference
  if (localStorage.getItem("darkmode") === "active") {
    document.body.classList.add("darkmode");
  }
}
