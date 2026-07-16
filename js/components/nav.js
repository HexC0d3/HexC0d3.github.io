import { esc } from "../utils.js";

/** Renders the top nav. `//0N.` indices are derived from array order. */
export function mountNav(root, { nav, profile }) {
  const num = (i) => String(i + 1).padStart(2, "0");
  const link = (item, i) =>
    `<a href="${esc(item.href)}"><span class="idx">//${num(i)}.</span> &lt;${esc(item.label)}/&gt;</a>`;

  const mid = Math.ceil(nav.length / 2);
  const left = nav.slice(0, mid).map(link).join("");
  const right = nav.slice(mid).map((it, i) => link(it, i + mid)).join("");

  root.innerHTML = `
    <div class="nav-in">
      <div class="nav-col">${left}</div>
      <div class="logo">${esc(profile.initials)}</div>
      <div class="nav-col right">${right}</div>
    </div>`;
}
