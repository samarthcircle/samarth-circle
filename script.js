const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

function updateHeader() {
  if (!siteHeader) return;
  siteHeader.classList.toggle("scrolled", window.scrollY > 18);
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

/*
  Wordmark contrast states:
  - normal: original brand artwork
  - dark/light: Samarth + upper logo curve use cream; Circle remains light blue on dark sections,
    and uses deep blue on the light-blue Who We Serve section.
  The two artwork layers are kept independent so the header itself never changes theme.
*/
const communityBand = document.querySelector(".community-band");
const darkSections = Array.from(document.querySelectorAll(".section-dark"));

if ("IntersectionObserver" in window && siteHeader) {
  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target === communityBand) {
        siteHeader.classList.toggle("community-active", entry.isIntersecting);
        siteHeader.classList.toggle("wordmark-light", entry.isIntersecting);
      }
      if (entry.target.classList.contains("section-dark")) {
        siteHeader.classList.toggle("wordmark-dark", entry.isIntersecting);
      }
    });
  }, { threshold: 0.18 });

  if (communityBand) headerObserver.observe(communityBand);
  darkSections.forEach(section => headerObserver.observe(section));
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
