import { initLightbox, initDarkMode } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize lightbox if it exists on the page
  if (document.getElementById("lightbox")) {
    initLightbox();
  }

  // Initialize dark mode toggle if it exists
  if (document.getElementById("theme-switch")) {
    initDarkMode();
  }
});
