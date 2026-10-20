/**
 * Bookora - Shared Global JavaScript
 * Handles active header navigation and cart counter badge updates
 */

document.addEventListener("DOMContentLoaded", () => {
  // Update cart badge initially
  if (typeof updateCartBadge === "function") {
    updateCartBadge();
  }

  // Highlight active navigation link
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
