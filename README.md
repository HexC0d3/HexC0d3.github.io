# 0xCode — Portfolio

Terminal / cyberpunk developer portfolio. **No framework, no build step required** —
plain HTML/CSS/ES modules. Content is data-driven, so updates mean editing one config
file, not the markup.

## Structure

```
andy-portfolio/
├── index.html              # thin shell: <link>s + empty mount points
├── build.py                # optional: bundles everything into dist/index.html
├── package.json
│
├── data/
│   └── content.js          # ← THE FILE YOU EDIT. All copy, projects, press, socials.
│
├── css/
│   ├── tokens.css          # ← colors + fonts. Retheme the whole site here.
│   ├── base.css            # reset, body, ambient bg, frame, utilities
│   └── components.css      # per-section styles + @keyframes
│
├── js/
│   ├── main.js             # boot: reads content, mounts each section
│   ├── utils.js            # qs/qsa, escaping, scroll-reveal
│   └── components/
│       ├── nav.js          # auto-numbered nav (//01, //02…)
│       ├── hero.js         # name, role, orbiting CV button, circuit trace
│       ├── portfolio.js    # data-driven carousel
│       ├── press.js        # data-driven press list
│       └── connect.js      # social nodes (positions auto-computed)
│
└── dist/
    └── index.html          # generated single-file bundle (run build.py)
```

**The idea:** `data/content.js` is the source of truth, `css/tokens.css` is the theme,
each section is an isolated component. Adding content never touches HTML/CSS.

## Run it

ES modules must be served over http (they won't run from `file://`). Pick one:

```bash
# zero dependencies (Python is already on your machine)
python3 -m http.server 8000
# → open http://localhost:8000

# or, if you prefer node
npx serve .
```

**Just want to open it directly / drop it on a host?** Build the single-file version:

```bash
python3 build.py          # writes dist/index.html
```

`dist/index.html` inlines all CSS + JS — double-click it, email it, or drop it on any
static host as-is.

## Deploy (GitHub Pages via Actions)

`.github/workflows/deploy.yml` runs `build.py` on every push to `main` and publishes the
bundled `dist/` to Pages. One-time setup:

1. Push the repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Done. Every push to `main` rebuilds and redeploys automatically
   (`https://<you>.github.io/<repo>/`). Trigger manually anytime from the Actions tab.

`dist/` is git-ignored — CI builds it, so there's no build output in the repo. No
`.nojekyll` needed on this path; the Actions deploy skips Jekyll.

## Common updates

**Add a project** — append to `content.portfolio.projects` in `data/content.js`:

```js
{
  name: "MyApp",
  role: "SOLO DEV",
  desc: "One or two sentences about it.",
  app: { head: "Top line", sub: "second line", num: "07", accent: "#45e845" },
}
```

**Add a press mention** — append to `content.press.items`:

```js
{ name: "TechCrunch", date: "Jan 05, 2026", href: "https://…" }
```

**Add a social** — append to `content.connect.socials` (layout auto-adjusts):

```js
{ name: "GitHub", href: "https://github.com/…" }
```

**Change your name / role / initials** — edit `content.profile`.

**Retheme** — edit the variables in `css/tokens.css`. Swapping the `--green*` values
for reds/ambers/etc. reskins the entire site, frame and glows included.

**Add a whole new section** — create `js/components/foo.js` exporting `mountFoo(root, content)`,
add a `<section><div id="foo-root"></div></section>` to `index.html`, and call it from
`js/main.js`. (If you use the bundle, add the file path to `JS_ORDER` in `build.py`.)

## Notes

- Fonts: Orbitron + Share Tech Mono (Google Fonts). The reference's exact display face
  isn't public — this is the closest match. Swap in `index.html` + `tokens.css` if you get the real one.
- Accessibility floor: keyboard-focusable links, responsive to mobile, `prefers-reduced-motion` respected.
- All content is escaped before injection (`utils.esc`), so external strings are safe.
