/* Shared helpers for sub-pages. Plain script (works over http and file://). */
(function () {
  // HTML-escape anything injected from the data arrays.
  window.esc = function (s) {
    return String(s ?? "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  // Build the top nav from a single list; mark the current page active.
  var NAV = [
    { label: "home",     href: "index.html" },
    { label: "certs",    href: "certifications.html" },
    { label: "pubs",     href: "publications.html" },
    { label: "projects", href: "projects.html" },
  ];
  window.mountNav = function (brand) {
    var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    var links = NAV.map(function (item, i) {
      var n = String(i + 1).padStart(2, "0");
      var active = item.href.toLowerCase() === here ? " active" : "";
      return '<a class="' + active.trim() + '" href="' + item.href + '">' +
             '<span class="n">//' + n + '</span>' + esc(item.label) + "</a>";
    }).join("");
    document.querySelectorAll("[data-nav]").forEach(function (el) {
      el.innerHTML =
        '<div class="nav-in"><a class="brand" href="index.html">' +
        esc(brand || "HB") + '<span class="c">//</span></a>' +
        '<div class="nav-links">' + links + "</div></div>";
    });
  };

  // Scroll-reveal.
  window.initReveal = function () {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  };
})();
