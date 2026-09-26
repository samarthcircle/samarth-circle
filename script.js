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
  Header contrast follows the section physically passing behind the fixed ribbon.
  This is deliberately geometry-based rather than relying on independent observer
  booleans, so the dark-blue -> light-blue transition cannot get stuck.
*/
const themeSections = [
  { el: document.querySelector(".hero"), theme: "dark" },
  { el: document.querySelector(".section-dark"), theme: "dark" },
  { el: document.querySelector(".community-band"), theme: "light" },
  { el: document.querySelector(".site-footer"), theme: "dark" }
].filter(item => item.el);

function updateHeaderTheme() {
  if (!siteHeader || !themeSections.length) return;

  // Sample just below the fixed ribbon. The section occupying this horizontal
  // band is the section that should control the logo/wordmark contrast.
  const sampleY = Math.min(siteHeader.offsetHeight * 0.72, window.innerHeight - 1);
  let activeTheme = "normal";
  let closestDistance = Infinity;

  themeSections.forEach(({ el, theme }) => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= sampleY && rect.bottom >= sampleY) {
      const distance = Math.abs(rect.top - sampleY);
      if (distance < closestDistance) {
        closestDistance = distance;
        activeTheme = theme;
      }
    }
  });

  siteHeader.classList.toggle("wordmark-dark", activeTheme === "dark");
  siteHeader.classList.toggle("wordmark-light", activeTheme === "light");
  siteHeader.classList.toggle("community-active", activeTheme === "light");
}

updateHeaderTheme();
window.addEventListener("scroll", updateHeaderTheme, { passive: true });
window.addEventListener("resize", updateHeaderTheme);

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
