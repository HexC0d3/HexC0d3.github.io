import { qsa, esc } from "../utils.js";

/** Renders the press list (first item active) and the connector below it. */
export function mountPress(root, { press }) {
  const { title, items } = press;
  const row = (it, i) => `
    <a class="press-row${i === 0 ? " active" : ""}" href="${esc(it.href)}"${it.href === "#" ? ' onclick="return false"' : ""}>
      <div>
        <div class="p-name">${esc(it.name)}</div>
        <div class="p-date">${esc(it.date)}</div>
      </div>
      <div class="p-arrow">&#8594;</div>
    </a>`;

  root.innerHTML = `
    <div class="wrap sec-head"><h3 class="sec-title" data-tag="h3">${esc(title)}</h3></div>
    <div class="wrap">
      <div class="press-list">${items.map(row).join("")}</div>
    </div>
    <div class="mid-conn">
      <svg viewBox="0 0 12 110">
        <circle class="node-dot" cx="6" cy="6" r="5"/>
        <line class="mid-line" x1="6" y1="6" x2="6" y2="104"/>
        <circle class="node-dot" cx="6" cy="104" r="5"/>
      </svg>
    </div>`;

  // Move the "active" highlight on hover/click (pointer devices already hover via CSS).
  const rows = qsa(".press-row", root);
  rows.forEach((r) =>
    r.addEventListener("click", () => {
      rows.forEach((x) => x.classList.remove("active"));
      r.classList.add("active");
    })
  );
}
