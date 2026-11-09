const root = document.documentElement;
const titles = {
  en: document.body.dataset.titleEn || "Adel Merad — Full-Stack Developer",
  fr: document.body.dataset.titleFr || "Adel Merad — Développeur Full-Stack",
  ar: document.body.dataset.titleAr || document.body.dataset.titleFr || "Adel Merad — Développeur Full-Stack",
};

function save(key, value) {
  try { localStorage.setItem(key, value); } catch {}
}

// Language switch (EN / FR / AR)
function setLang(lang) {
  root.dataset.lang = lang;
  root.lang = lang;
  root.dir = lang === "ar" ? "rtl" : "ltr";
  document.title = titles[lang];
  save("lang", lang);
}
document.querySelectorAll("[data-set-lang]").forEach((btn) => {
  btn.addEventListener("click", () => setLang(btn.dataset.setLang));
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

if (root.dataset.lang !== "en") document.title = titles[root.dataset.lang] || titles.fr;
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

// Live local time in Algiers next to the availability line
const clocks = document.querySelectorAll(".clock");
if (clocks.length) {
  const tick = () => {
    const t = new Date().toLocaleTimeString("en-GB", { timeZone: "Africa/Algiers", hour: "2-digit", minute: "2-digit" });
    clocks.forEach((c) => { c.textContent = t; });
  };
  tick();
  setInterval(tick, 30000);
}
