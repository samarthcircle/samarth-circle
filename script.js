const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

function updateHeader() {
  if (siteHeader) siteHeader.classList.toggle("scrolled", window.scrollY > 18);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const communityBand = document.querySelector(".community-band");
if (communityBand && "IntersectionObserver" in window) {
  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      siteHeader?.classList.toggle("community-active", entry.isIntersecting);
    });
  }, { threshold: 0.28 });
  headerObserver.observe(communityBand);
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
