const root = document.documentElement;
const titles = {
  en: document.body.dataset.titleEn || "Adel Merad — Full-Stack Developer",
  fr: document.body.dataset.titleFr || "Adel Merad — Développeur Full-Stack",
  ar: document.body.dataset.titleAr || document.body.dataset.titleFr || "Adel Merad — Développeur Full-Stack",
};

function save(key, value) {
  try { localStorage.setItem(key, value); } catch {}
}

// Labels read by screen readers, in the page's language
const labels = {
  en: { language: "Language", theme: "Toggle theme", menu: "Menu" },
  fr: { language: "Langue", theme: "Changer de thème", menu: "Menu" },
  ar: { language: "اللغة", theme: "تبديل المظهر", menu: "القائمة" },
};
// Each language button is named in its own language. Not with a lang attribute:
// the CSS hides every [lang] element that is not in the current language.
const langNames = { en: "English", fr: "Français", ar: "العربية" };

function applyLabels(lang) {
  const l = labels[lang] || labels.en;
  const set = (sel, text) => document.querySelectorAll(sel).forEach((el) => el.setAttribute("aria-label", text));
  set(".lang-switch", l.language);
  set("#theme", l.theme);
  set(".burger", l.menu);
  document.querySelectorAll("[data-set-lang]").forEach((btn) => {
    btn.setAttribute("aria-label", langNames[btn.dataset.setLang]);
    btn.setAttribute("aria-pressed", String(btn.dataset.setLang === lang));
  });
}

// Language switch (EN / FR / AR)
function setLang(lang) {
  root.dataset.lang = lang;
  root.lang = lang;
  root.dir = lang === "ar" ? "rtl" : "ltr";
  document.title = titles[lang];
  save("lang", lang);
  applyLabels(lang);
  // keep the language in the address bar, so a copied link opens in the same language
  try {
    const url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState(null, "", url);
  } catch {}
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

// Mobile menu: a burger button that opens the links under the pill
const nav = document.querySelector(".nav");
const navLinks = nav && nav.querySelector(".links");
if (navLinks) {
  navLinks.id = "nav-links";
  const burger = document.createElement("button");
  burger.type = "button";
  burger.className = "burger";
  burger.setAttribute("aria-label", "Menu");
  burger.setAttribute("aria-controls", "nav-links");
  burger.setAttribute("aria-expanded", "false");
  burger.innerHTML = "<span></span>";
  nav.querySelector(".toggles").append(burger);
  const setOpen = (open) => {
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  };
  burger.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
  navLinks.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
  document.addEventListener("click", (e) => { if (!nav.contains(e.target)) setOpen(false); });
}

applyLabels(root.dataset.lang);

// Highlight the menu link of the section on screen (home page anchors only)
const sectionLinks = navLinks ? [...navLinks.querySelectorAll('a[href^="#"]')] : [];
if (sectionLinks.length && "IntersectionObserver" in window) {
  const byId = new Map(sectionLinks.map((a) => [a.getAttribute("href").slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      sectionLinks.forEach((a) => a.classList.remove("active"));
      const link = byId.get(e.target.id);
      if (link) link.classList.add("active");
    }
  }, { rootMargin: "-45% 0px -50% 0px" });
  byId.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
}

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
