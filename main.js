const root = document.documentElement;
const titles = {
  en: document.body.dataset.titleEn || "Adel Merad — Full-Stack Developer",
  fr: document.body.dataset.titleFr || "Adel Merad — Développeur Full-Stack",
};

function save(key, value) {
  try { localStorage.setItem(key, value); } catch {}
}

// Language toggle (EN / FR)
document.getElementById("lang").addEventListener("click", () => {
  const next = root.dataset.lang === "fr" ? "en" : "fr";
  root.dataset.lang = next;
  root.lang = next;
  document.title = titles[next];
  save("lang", next);
});

// Theme toggle (dark by default, follows the system on first visit)
if (!root.dataset.theme && window.matchMedia("(prefers-color-scheme: light)").matches) {
  root.dataset.theme = "light";
}
document.getElementById("theme").addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  save("theme", next);
});

if (root.dataset.lang === "fr") document.title = titles.fr;
document.getElementById("year").textContent = new Date().getFullYear();

// Fade sections in as they enter the viewport
const targets = document.querySelectorAll(".section, .card, .timeline li");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }
  }, { threshold: 0.12 });
  targets.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
}
