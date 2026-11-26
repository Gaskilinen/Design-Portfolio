# Andrew Gaskell — Portfolio

The personal portfolio of **Andrew Gaskell**, UX & Product Designer at the UK Tote Group.

The site is hand-written HTML, CSS and a small amount of vanilla JavaScript. There is no build step and no framework: every file in the repo is served as it is. It is built page by page from the **Andrew Gaskell Portfolio** Figma file.

## Live site

**[gaskilinen.github.io/Design-Portfolio](https://gaskilinen.github.io/Design-Portfolio/)**

| Page | Link |
|---|---|
| Homepage | [View](https://gaskilinen.github.io/Design-Portfolio/) |
| Multiples | [View](https://gaskilinen.github.io/Design-Portfolio/multiples.html) |
| Sportsbook Cross Sell | [View](https://gaskilinen.github.io/Design-Portfolio/sportsbook-cross-sell.html) |
| Lock In Your Price | [View](https://gaskilinen.github.io/Design-Portfolio/lock-in-your-price.html) |
| Tote Design System | [View](https://gaskilinen.github.io/Design-Portfolio/tote-design-system.html) |

The site is published by GitHub Pages from the `main` branch, and updates within a minute or two of each push. The previous design is kept on the [`archive/original-design`](https://github.com/Gaskilinen/Design-Portfolio/tree/archive/original-design) branch, which is not published.

## What's in the site

- **Homepage** (`index.html`): intro, the three case studies, the Design System section and the Playground.
- **Multiples** (`multiples.html`): building a bet type no other pool operator has, worth £4.5M a year.
- **Sportsbook Cross Sell** (`sportsbook-cross-sell.html`): improving the sportsbook experience with limited developer resource, validated by A/B testing.
- **Lock In Your Price** (`lock-in-your-price.html`): giving customers a guaranteed return on a pool bet. This is the current project, and includes the customer interview video and an AI prototype.
- **Tote Design System** (`tote-design-system.html`): consolidating 537 components into 142, with tokens that developers and AI agents can build from.

Each case study uses the same layout: a sticky side nav that highlights the section in view, numbered sections, and carousels for wide content such as design steps and user journeys.

## Repository structure

```
.
├── index.html                    # Homepage
├── multiples.html                # Case study
├── sportsbook-cross-sell.html    # Case study
├── lock-in-your-price.html       # Case study
├── tote-design-system.html       # Case study
├── tokens.css                    # Design tokens: colours, spacing, type sizes
├── site.css                      # Shared base styles: reset, header, chips, metrics, buttons, scroll reveal
├── case-study.css                # Shared case study layout and components
├── site.js                       # Header state, scroll reveal, carousels, side nav highlighting
├── images/                       # Images, prefixed by page (see below)
├── media/                        # Video (Lock In Your Price interview)
└── .github/workflows/            # Jekyll build check on push to main
```

Images are prefixed by the page that uses them:

| Prefix | Page |
|---|---|
| `home-` | Homepage |
| `mx-` | Multiples |
| `cs-` | Sportsbook Cross Sell |
| `liyp-` | Lock In Your Price |
| `tds-` | Tote Design System |

## Running locally

Any static file server works. From the repo root:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. Serve the site over HTTP rather than opening the files directly, so the styles, images and video load correctly.

## Editing the site

### Styles

Styles are layered, and each page loads them in this order:

1. **`tokens.css`**: design tokens taken from Figma. Use the `--pf-*` semantic tokens (for example `--pf-text-primary` or `--pf-surface-muted`) rather than raw colours. The file also still holds the older Tote colour ramps, separately, at the top.
2. **`site.css`**: base styles shared by every page.
3. **`case-study.css`**: layout and components shared by the case studies, such as the side nav, carousels, step flows, insight cards and quote cards.
4. **A `<style>` block in each page**: styles used by that page only.

Key tokens:

| Token | Value | Use |
|---|---|---|
| `--pf-text-primary` | `#1d1e20` | Body text |
| `--pf-text-secondary` | `#625878` | Supporting text, hypotheses, captions |
| `--pf-text-tertiary` | `#8d8f92` | Subtitles and intros |
| `--pf-text-positive` | `#3f8f6b` | Metrics and positive insights |
| `--pf-text-negative` | `#c9483f` | Negative insights |
| `--pf-surface-muted` | `#f3f4f8` | Panels and cards |
| `--pf-action-primary` | `#302a3f` | Buttons and button borders |
| `--space-01` to `--space-11` | 4px to 160px | Spacing scale |
| `--radius-md` | 8px | Corner radius |

### Typography

**DM Sans** is used throughout, with **Lato** for buttons and homepage chips. Both are loaded from Google Fonts. The Lock In Your Price page also loads a single Roboto glyph for its "£" badge.

### Behaviour

`site.js` drives the interactive parts through data attributes, so new pages only need the right markup:

- `data-reveal` on a section fades it in as it scrolls into view. Reduced-motion settings are respected.
- `data-carousel` on a scrolling track, plus buttons with `data-carousel-prev` and `data-carousel-next` whose `aria-controls` points to the track's `id`.
- `data-scrollspy` on the side nav highlights the link for the section in view.

### After changing shared CSS or JS

Pages load the shared files with a version tag, for example `site.css?v=2026-11-26d`, so returning visitors get the new files rather than cached copies. When you change `tokens.css`, `site.css`, `case-study.css` or `site.js`, update the tag in every page's `<head>` and before `</body>`.

### Adding a case study

1. Copy the closest existing case study, for example `tote-design-system.html` for a simple page or `multiples.html` for one with carousels.
2. Replace the content and the side nav links, and give each section a matching `id`.
3. Add page-only styles to its `<style>` block, and prefix its images with a short page code.
4. Link it from the homepage in `index.html`.

### File names

GitHub Pages treats file names as case-sensitive, but macOS does not. Make sure every `src` and `href` matches the file name's capitalisation exactly, or it will work locally and break on the live site.

## Deploying

GitHub Pages is set to **Deploy from a branch**: `main`, `/ (root)`. To publish, commit and push to `main`.

The workflow in `.github/workflows/jekyll-docker.yml` runs a Jekyll build on each push as a check. It does not publish the site; GitHub Pages does that.

### Custom domain (optional)

To use a domain you own (for example `andrewgaskell.com`):

1. Add a `CNAME` file at the repo root containing just the domain name.
2. In your DNS provider, add `A` records pointing to GitHub Pages (185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153), or a `CNAME` record pointing to `gaskilinen.github.io`.
3. In **Settings → Pages**, enter the domain, then tick **Enforce HTTPS** once the certificate is ready (usually a few minutes).

## Credits

- Design, content and copy: Andrew Gaskell
- Site build: Andrew Gaskell with Claude
- Fonts: [DM Sans](https://fonts.google.com/specimen/DM+Sans), [Lato](https://fonts.google.com/specimen/Lato) and [Roboto](https://fonts.google.com/specimen/Roboto) via Google Fonts

## Contact

- Email: [andygaskell10@outlook.com](mailto:andygaskell10@outlook.com)
- LinkedIn: [Andrew Gaskell](https://www.linkedin.com/in/andrew-gaskell-4092a5191)
