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
  Desktop-site mode on phones:
  Chrome/Android can change its user-agent when "Request desktop site" is enabled.
  Detect that state using the combination of a touch device, a narrow physical
  viewport and a desktop-style user-agent, rather than relying on one UA token.
*/
function isDesktopRequestedOnTouchDevice() {
  const ua = navigator.userAgent || "";
  const touch = (navigator.maxTouchPoints || 0) > 0 || "ontouchstart" in window;
  const narrow = Math.min(window.innerWidth || 0, window.screen?.width || window.innerWidth || 0) <= 800;
  const androidDesktopUA = /Android/i.test(ua) && !/Mobile/i.test(ua);
  const iphoneDesktopUA = /Macintosh/i.test(ua) && touch && !/Mobile/i.test(ua) && !/iPad/i.test(ua);
  return touch && narrow && (androidDesktopUA || iphoneDesktopUA);
}

function updateDesktopRequest() {
  const requested = isDesktopRequestedOnTouchDevice();
  document.documentElement.classList.toggle("desktop-requested", requested);

  if (requested && window.innerWidth < 980) {
    const scale = Math.max(0.42, Math.min(1, window.innerWidth / 980));
    document.documentElement.style.setProperty("--desktop-scale", String(scale));
  } else {
    document.documentElement.style.removeProperty("--desktop-scale");
  }
}
updateDesktopRequest();
window.addEventListener("resize", updateDesktopRequest, { passive: true });
window.addEventListener("orientationchange", updateDesktopRequest, { passive: true });

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
