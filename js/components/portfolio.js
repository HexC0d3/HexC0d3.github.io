import { qs, qsa, esc } from "../utils.js";

const wave = (c) => `
  <svg class="wave" viewBox="0 0 150 96" preserveAspectRatio="none">
    <path d="M0 46 C30 20 55 60 80 44 S140 30 150 52 V96 H0 Z" fill="${c}" opacity=".9"/>
    <path d="M0 62 C34 40 60 74 92 58 S150 52 150 66 V96 H0 Z" fill="${c}" opacity=".4"/>
  </svg>`;

// Themed glyphs for the mock preview — keyed by `app.icon` in content.js.
const ICONS = {
  target: `
    <circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/>
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>
    <line x1="12" y1="1" x2="12" y2="3.5"/><line x1="12" y1="20.5" x2="12" y2="23"/>
    <line x1="1" y1="12" x2="3.5" y2="12"/><line x1="20.5" y1="12" x2="23" y2="12"/>`,
  gear: `
    <circle cx="12" cy="12" r="3.5"/><circle cx="12" cy="12" r="7.5"/>
    <line x1="12" y1="1" x2="12" y2="4.5"/><line x1="12" y1="19.5" x2="12" y2="23"/>
    <line x1="1" y1="12" x2="4.5" y2="12"/><line x1="19.5" y1="12" x2="23" y2="12"/>
    <line x1="4.3" y1="4.3" x2="6.7" y2="6.7"/><line x1="17.3" y1="17.3" x2="19.7" y2="19.7"/>
    <line x1="19.7" y1="4.3" x2="17.3" y2="6.7"/><line x1="6.7" y1="17.3" x2="4.3" y2="19.7"/>`,
  bug: `
    <rect x="8" y="8" width="8" height="10" rx="4"/>
    <line x1="12" y1="2" x2="12" y2="8"/><line x1="9" y1="4" x2="7" y2="2"/><line x1="15" y1="4" x2="17" y2="2"/>
    <line x1="8" y1="11" x2="3" y2="9"/><line x1="8" y1="14" x2="2" y2="14"/><line x1="8" y1="17" x2="3" y2="19"/>
    <line x1="16" y1="11" x2="21" y2="9"/><line x1="16" y1="14" x2="22" y2="14"/><line x1="16" y1="17" x2="21" y2="19"/>
    <line x1="9" y1="8" x2="15" y2="8"/>`,
};

const icon = (name) => `
  <svg class="app-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
    ${ICONS[name] || ""}
  </svg>`;

const slideHTML = (p) => `
  <div class="preview">
    <div class="lens"></div>
    <div class="lens spin"></div>
    <div class="device">
      <div class="app" style="--accent:${p.app.accent}">
        ${icon(p.app.icon)}
        <div class="top">
          <b>${esc(p.app.head)}</b>
          <ul class="subs">
            ${p.app.subs.map((s) => `<li>${esc(s)}</li>`).join("")}
          </ul>
        </div>
        ${wave(p.app.accent)}
      </div>
    </div>
  </div>
  <div class="p-info">
    <div class="p-title">${esc(p.name)}</div>
    <p class="p-desc">${esc(p.desc)}</p>
    <div class="p-role">${esc(p.role)}</div>
  </div>`;

/** Builds the radar tick-ring SVG injected between the two lens rings. */
function addTicks(preview) {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("class", "ticks");
  svg.setAttribute("viewBox", "0 0 100 100");
  let d = "";
  for (let a = 0; a < 360; a += 15) {
    const r = a % 45 === 0 ? 42 : 44.5;
    const x1 = 50 + Math.cos((a * Math.PI) / 180) * r;
    const y1 = 50 + Math.sin((a * Math.PI) / 180) * r;
    const x2 = 50 + Math.cos((a * Math.PI) / 180) * 47;
    const y2 = 50 + Math.sin((a * Math.PI) / 180) * 47;
    d += `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="#2f7a34" stroke-width="1"/>`;
  }
  svg.innerHTML = d;
  preview.insertBefore(svg, preview.firstChild.nextSibling);
}

/** Renders the portfolio section (title + carousel) and wires the controls. */
export function mountPortfolio(root, { portfolio }) {
  const { title, projects } = portfolio;
  root.innerHTML = `
    <div class="wrap sec-head"><h2 class="sec-title" data-tag="h2">${esc(title)}</h2></div>
    <div class="wrap">
      <div class="slider">
        ${projects.map((p, i) => `<article class="slide${i === 0 ? " active" : ""}">${slideHTML(p)}</article>`).join("")}
      </div>
      <div class="controls">
        <button class="arrow js-prev" aria-label="Previous project">&#8249;</button>
        <div class="progress"><span class="js-bar"></span></div>
        <button class="arrow js-next" aria-label="Next project">&#8250;</button>
      </div>
    </div>`;

  const slides = qsa(".slide", root);
  const bar = qs(".js-bar", root);
  qsa(".preview", root).forEach(addTicks);

  let idx = 0;
  const total = projects.length;
  const go = (n) => {
    slides[idx].classList.remove("active");
    idx = (n + total) % total;
    slides[idx].classList.add("active");
    bar.style.width = ((idx + 1) / total) * 100 + "%";
  };
  qs(".js-next", root).addEventListener("click", () => go(idx + 1));
  qs(".js-prev", root).addEventListener("click", () => go(idx - 1));
  bar.style.width = (1 / total) * 100 + "%";
}
