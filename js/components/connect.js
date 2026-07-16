import { esc } from "../utils.js";

// Node diameters cycle through these; positions are computed so any count scatters nicely.
const SIZES = [150, 160, 130, 140];

/** Renders the "Connect" section. Social positions/sizes are generated from the array. */
export function mountConnect(root, { connect, footer }) {
  const { title, socials } = connect;
  const n = socials.length;

  const node = (s, i) => {
    const size = SIZES[i % SIZES.length];
    const left = 4 + i * (82 / Math.max(n, 1));           // spread across the band
    const top = 120 + Math.round(Math.sin(i * 1.15) * 95); // gentle scatter on Y
    const style = `left:${left.toFixed(1)}%;top:${top}px;width:${size}px;height:${size}px;animation-delay:${(i * 0.5).toFixed(1)}s`;
    return `
      <a class="node" style="${style}" href="${esc(s.href)}" target="_blank" rel="noopener noreferrer"${s.href === "#" ? ' onclick="return false"' : ""}>
        <span>
          <span class="b">&lt;&gt;</span>
          <span class="n">${esc(s.name)}</span>
          <span class="b">&lt;/&gt;</span>
        </span>
      </a>`;
  };

  root.innerHTML = `
    <div class="wrap sec-head"><h4 class="sec-title" data-tag="h4">${esc(title)}</h4></div>
    <div class="wrap">
      <div class="nodes">${socials.map(node).join("")}</div>
    </div>
    <footer><span class="tag">&lt;footer&gt;</span> ${esc(footer)} <span class="tag">&lt;/footer&gt;</span></footer>`;
}
