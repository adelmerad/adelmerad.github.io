const root = document.documentElement;

function save(key, value) {
  try { localStorage.setItem(key, value); } catch {}
}

// Language toggle (EN / FR)
document.getElementById("lang").addEventListener("click", () => {
  const next = root.dataset.lang === "fr" ? "en" : "fr";
  root.dataset.lang = next;
  root.lang = next;
  document.title = next === "fr"
    ? "Adel Merad — Développeur Full-Stack"
    : "Adel Merad — Full-Stack Developer";
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

if (root.dataset.lang === "fr") document.title = "Adel Merad — Développeur Full-Stack";
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
