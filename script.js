// ============================
// 1. Année dynamique dans le footer
// ============================

const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ============================
// 2. Menu burger (mobile)
// ============================

const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
    });
  });
}

// ============================
// 3. Effet "reveal" au scroll
// ============================

const revealElements = document.querySelectorAll(
  ".section-header, .card, .project-card, .gallery-item, .nature-card, .skill-card, .parallelogram-card"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});

// ============================
// 4. Fenêtre 1200x1080 pour le mini-jeu Godot
// ============================

const gameIframe = document.getElementById("meteor-game");
const gameFullscreenBtn = document.querySelector(".game-fullscreen-btn");

if (gameIframe && gameFullscreenBtn) {
  gameFullscreenBtn.addEventListener("click", () => {
    const url = gameIframe.src || "Game/index.html";

    const win = window.open(
      url,
      "meteor_escape_window",
      "width=1200,height=1080,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=no"
    );

    if (!win) {
      alert("Le navigateur a bloqué la fenêtre. Autorise les pop-up pour ce site.");
    }
  });
}
