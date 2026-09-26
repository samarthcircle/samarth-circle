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
  V11 deliberately removes the logo/wordmark colour-transition system.
  The supplied original artwork is kept untouched throughout the page.
*/

/*
  Some mobile browsers keep a narrow CSS viewport even after the user chooses
  "Desktop site". Detect that browser mode and let the stylesheet use its
  compact desktop canvas instead of the portrait/mobile layout.
*/
function updateDesktopRequest() {
  const ua = navigator.userAgent || "";
  const looksLikeMobileUA = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
  const hasDesktopUA = /Windows NT|Macintosh|X11|Linux x86_64/i.test(ua) && !/Mobile/i.test(ua);
  const desktopRequested = looksLikeMobileUA && hasDesktopUA;
  document.documentElement.classList.toggle("desktop-requested", desktopRequested);
}
updateDesktopRequest();
window.addEventListener("resize", updateDesktopRequest, { passive: true });

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
