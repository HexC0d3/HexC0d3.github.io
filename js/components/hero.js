import { esc } from "../utils.js";

/** Renders the hero: kicker, big name, role, and the orbiting CV button. */
export function mountHero(root, { profile }) {
  const nameLines = profile.name.map(esc).join("<br>");
  root.innerHTML = `
    <div class="hero-grid">
      <div>
        <div class="kicker"><span class="tag">&lt;p&gt;</span> ${esc(profile.kicker)} <span class="tag">&lt;/p&gt;</span></div>
        <h1 class="name">
          <span class="htag">&lt;h1&gt;</span>
          ${nameLines}
          <span class="htag">&lt;/h1&gt;</span>
        </h1>
        <div class="role">
          <span class="tag">&lt;p&gt;</span> ${esc(profile.role)}
          <span class="cursor"></span>
          <span class="tag">&lt;/p&gt;</span>
        </div>
      </div>

      <div class="orbit">
        <div class="planet"></div>
        <div class="ring r1"><span class="dot"></span></div>
        <div class="ring r2"></div>
        <div class="ring r3"><span class="dot"></span></div>
        <a class="cv" href="${esc(profile.cv.url)}"${profile.cv.url === "#" ? ' onclick="return false"' : ""}>&lt;${esc(profile.cv.label)}/&gt;</a>
      </div>
    </div>`;
}

/** Decorative circuit trace that runs from the hero down toward the portfolio. */
export function mountHeroCircuit(root) {
  root.innerHTML = `
    <svg class="circuit" viewBox="0 0 1000 150" preserveAspectRatio="none">
      <path class="trace" d="M60 6 V60 Q60 78 78 78 H180 Q210 78 210 100 V132"/>
      <text class="slash" x="150" y="52">&lt;/&gt;</text>
      <circle class="node-dot" cx="210" cy="140" r="6"/>
    </svg>`;
}
