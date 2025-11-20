// ===========================
// SMOOTH SCROLL
// ===========================
function smoothScrollTo(target) {
  const element = document.querySelector(target);
  if (!element) return;

  const offset = 70; // hauteur du header
  const top = element.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top,
    behavior: "smooth",
  });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    if (href.startsWith("#")) {
      e.preventDefault();
      smoothScrollTo(href);
    }
  });
});

// ===========================
// NAV ACTIVE ON SCROLL
// ===========================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function onScrollUpdateNav() {
  const scrollPos = window.scrollY;
  const headerHeight = 80;

  let currentId = "hero";

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const top = rect.top + window.scrollY - headerHeight - 50;

    if (scrollPos >= top) {
      currentId = section.id;
    }
  });

  navLinks.forEach(link => {
    const href = link.getAttribute("href") || "";
    const id = href.replace("#", "");
    link.classList.toggle("active", id === currentId);
  });
}

window.addEventListener("scroll", onScrollUpdateNav);
window.addEventListener("load", onScrollUpdateNav);

// ===========================
// REVEAL ANIMATIONS
// ===========================
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealElements.forEach(el => observer.observe(el));
} else {
  // Fallback sans IntersectionObserver
  revealElements.forEach(el => el.classList.add("visible"));
}

// ===========================
// BURGER MENU
// ===========================
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");

if (burger && nav) {
  burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    burger.classList.toggle("active", isOpen);
    burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 760 && nav.classList.contains("open")) {
        nav.classList.remove("open");
        burger.classList.remove("active");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  });
}

// ===========================
// BACK TO TOP VISIBILITY
// ===========================
const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });
}

// ===========================
// FAKE CONTACT FORM (UX)
// ===========================
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();

    const name = contactForm.querySelector("#name");
    const email = contactForm.querySelector("#email");
    const message = contactForm.querySelector("#message");

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      alert("Merci de remplir tous les champs avant d'envoyer.");
      return;
    }

    alert(
      "Merci pour votre message " +
        name.value.trim() +
        " ! (Formulaire en mode démo, aucun mail réel n'a été envoyé.)"
    );

    contactForm.reset();
  });
}
