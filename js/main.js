import { content } from "../data/content.js";
import { qs, initReveal } from "./utils.js";
import { mountNav } from "./components/nav.js";
import { mountHero, mountHeroCircuit } from "./components/hero.js";
import { mountPortfolio } from "./components/portfolio.js";
import { mountPress } from "./components/press.js";
import { mountConnect } from "./components/connect.js";

/** Boot: title from config, then mount each section into its root. */
function boot() {
  document.title = content.meta.title;

  mountNav(qs("#nav"), content);
  mountHero(qs("#hero"), content);
  mountHeroCircuit(qs("#hero-circuit"));
  mountPortfolio(qs("#portfolio-root"), content);
  mountPress(qs("#press-root"), content);
  mountConnect(qs("#contact-root"), content);

  initReveal();
}

document.addEventListener("DOMContentLoaded", boot);
