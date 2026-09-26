const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

function updateHeader() {
  if (!siteHeader) return;
  siteHeader.classList.toggle("scrolled", window.scrollY > 160);
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

/*
  V11 deliberately removes the logo/wordmark colour-transition system.
  The supplied original artwork is kept untouched throughout the page.
*/

/*
  Desktop-site mode on phones — V13
  Do not fake a desktop layout with min-width/zoom. Instead, change the
  viewport definition itself to a desktop-width layout viewport. This lets
  the browser perform the same scale-to-fit behaviour used by conventional
  desktop-site rendering, while leaving the actual desktop CSS/layout untouched.
*/
const viewportMeta = document.getElementById("viewport-meta");
const normalViewport = "width=device-width, initial-scale=1.0";
const desktopViewport = "width=980, initial-scale=1.0";

function isDesktopUAOnTouchDevice() {
  const ua = navigator.userAgent || "";
  const touch = (navigator.maxTouchPoints || 0) > 0 || "ontouchstart" in window;
  if (!touch) return false;

  // Android Chrome in Desktop Site mode removes the Mobile token.
  const androidDesktop = /Android/i.test(ua) && !/Mobile/i.test(ua);

  // iPhone/iPad desktop-style Safari/Chrome may identify as Macintosh.
  const appleDesktop = /Macintosh/i.test(ua) && !/Mobile/i.test(ua);

  return androidDesktop || appleDesktop;
}

function updateViewportMode() {
  if (!viewportMeta) return;
  const desktopRequested = isDesktopUAOnTouchDevice();
  const desired = desktopRequested ? desktopViewport : normalViewport;

  if (viewportMeta.getAttribute("content") !== desired) {
    viewportMeta.setAttribute("content", desired);
  }

  document.documentElement.classList.toggle("desktop-requested", desktopRequested);
}

updateViewportMode();
window.addEventListener("resize", updateViewportMode, { passive: true });
window.addEventListener("orientationchange", updateViewportMode, { passive: true });

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
