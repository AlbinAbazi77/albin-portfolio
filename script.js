/* =========================================================
   Albin Abazi | Portfolio script (vanilla JavaScript)
   1. Contact settings  2. Mobile menu  3. Header on scroll
   4. Active link highlight  5. Scroll reveal  6. Footer year
   ========================================================= */

/* ---------- 1. CONTACT SETTINGS ----------
   Add your own details here. Cards with an empty value stay hidden,
   so the site never shows a broken link.
   - email:    your email address, e.g. "name@gmail.com"
   - whatsapp: your number with country code, digits only, e.g. "38970123456"  */
const CONTACT_INFO = {
  email: "",
  whatsapp: ""
};

function setupContactLinks() {
  const email = document.querySelector('[data-contact="email"]');
  const whatsapp = document.querySelector('[data-contact="whatsapp"]');

  if (CONTACT_INFO.email) {
    email.querySelector("a").href = "mailto:" + CONTACT_INFO.email;
    email.hidden = false;
  }
  if (CONTACT_INFO.whatsapp) {
    whatsapp.querySelector("a").href = "https://wa.me/" + CONTACT_INFO.whatsapp.replace(/\D/g, "");
    whatsapp.hidden = false;
  }
}
setupContactLinks();

/* Tell the CSS that JavaScript is running (so the reveal animation is only used when it can finish) */
document.documentElement.classList.add("js");

/* ---------- 2. MOBILE MENU ---------- */
const toggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

toggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));

// Close the menu after tapping a link, or when pressing Escape
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

/* ---------- 3. HEADER BORDER WHEN SCROLLING ---------- */
const header = document.querySelector(".site-header");
function onScroll() { header.classList.toggle("scrolled", window.scrollY > 10); }
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- 4. HIGHLIGHT THE CURRENT SECTION IN THE NAV ---------- */
const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
      });
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" }); // a section counts as "current" when it crosses the middle of the screen

sections.forEach(section => sectionObserver.observe(section));

/* ---------- 5. REVEAL ELEMENTS WHEN THEY SCROLL INTO VIEW ---------- */
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // animate only once
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* ---------- 6. CURRENT YEAR IN THE FOOTER ---------- */
document.getElementById("year").textContent = new Date().getFullYear();