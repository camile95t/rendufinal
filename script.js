/* =============================
   SMOOTH SCROLL AMÉLIORÉ
============================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));

    if (!target) return;

    e.preventDefault();

    window.scrollTo({
      top: target.offsetTop - 20,
      behavior: "smooth",
    });
  });
});


/* =============================
   BOUTON RETOUR EN HAUT
============================= */
const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});


/* =============================
   ANIMATION DES SECTIONS
============================= */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".section-card").forEach(section => {
  section.classList.add("hidden"); // caché par défaut
  observer.observe(section);
});


/* =============================
   MENU BURGER (OPTIONNEL)
============================= */
// À activer si tu ajoutes un menu mobile
const burger = document.querySelector(".burger");
const nav = document.querySelector(".hero-nav");

if (burger) {
  burger.addEventListener("click", () => {
    nav.classList.toggle("open");
    burger.classList.toggle("active");
  });
}
