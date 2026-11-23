// Runs in <head>, before the page is painted, so the visitor never sees a flash
// of the wrong language or theme. Language order: ?lang= in the URL (shared
// links), then the visitor's saved choice, then English.
(function () {
  var r = document.documentElement;
  var langs = (r.dataset.langs || "en fr").split(" ");
  var l = null;
  try {
    var t = localStorage.getItem("theme");
    if (t) r.dataset.theme = t;
    var fromUrl = new URLSearchParams(location.search).get("lang");
    if (langs.indexOf(fromUrl) < 0) fromUrl = null;      // ignore unknown values
    if (fromUrl) localStorage.setItem("lang", fromUrl);
    l = fromUrl || localStorage.getItem("lang");
  } catch (e) {}
  if (!l || langs.indexOf(l) < 0) l = l === "ar" && langs.indexOf("fr") >= 0 ? "fr" : "en";
  r.dataset.lang = l;
  r.lang = l;
  r.dir = l === "ar" ? "rtl" : "ltr";
})();
