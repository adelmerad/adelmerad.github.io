# Adel Merad — Portfolio

Personal website of Adel Merad, full-stack developer and Software Engineering Master's student at USTHB (Algiers): **[adelmerad.github.io](https://adelmerad.github.io)**

- **Three languages:** English, French and Arabic (right to left), switched without reloading the page
- **Shareable language links:** add `?lang=en`, `?lang=fr` or `?lang=ar` to any page, e.g. [adelmerad.github.io/?lang=fr](https://adelmerad.github.io/?lang=fr)
- **Case studies** of projects in production, and a **[blog](https://adelmerad.github.io/blog.html)** with 17 technical articles
- Dark and light themes, following the system on the first visit
- Plain HTML, CSS and JavaScript: no framework, no build step, hosted on GitHub Pages

## How the languages work

Every text is written three times in the page, each in a `span` with a `lang` attribute, and one CSS rule shows only the current language. `boot.js` runs in the `<head>` before the page is painted, so there is no flash of the wrong language or theme. The details, and the right-to-left traps, are in the article [One page, three languages](https://adelmerad.github.io/blog-three-languages.html).

## Files

| File | Role |
|------|------|
| `index.html` | Home page: profile, selected work, experience, contact |
| `*.html` (cim, presence, hokoki, shopo, sso, leaderboard) | Project case studies |
| `blog.html`, `blog-*.html` | Blog index and articles |
| `boot.js` | Applies the language (from `?lang=` or the saved choice) and the theme before paint |
| `main.js` | Language and theme switches, mobile menu, scroll effects |
| `styles.css` | All styles, including right-to-left rules for Arabic |
| `404.html` | Not-found page (uses absolute paths, since GitHub Pages can serve it at any depth) |
| `assets/` | Images, icons and CVs |

## Run locally

Serve the folder from its root, so that the absolute paths of the 404 page work:

```bash
npx serve .
```

Opening `index.html` directly in a browser also works for every page except `404.html`.
