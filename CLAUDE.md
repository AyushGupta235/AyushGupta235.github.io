# CLAUDE.md

Notes for future Claude/agent sessions working on this repo.

## What this is

Ayush Gupta's personal website — `ayushgupta.github.io`.
A field-journal-styled site built with **Astro + MDX**, deployed to GitHub
Pages via GitHub Actions.

Until June 2026 this repo was a Jekyll site. The Astro rebuild lives in
`site/`. The legacy Jekyll files were removed in the same commit that
introduced this file.

## Layout

```
.
├── site/                   # the Astro project (everything below is inside it)
│   ├── src/
│   │   ├── pages/          # routes — index, stack, projects, oss, notes, about, now, 404, rss.xml
│   │   ├── content/
│   │   │   ├── posts/      # MDX/MD essays + book notes (collection: "posts")
│   │   │   ├── projects/   # one file per project (collection: "projects")
│   │   │   └── oss/        # one file per OSS contribution (collection: "oss")
│   │   ├── content.config.ts   # zod schemas for the three collections
│   │   ├── components/     # Nav, Footer, MarginRail, FiledReport, CmdK, BootLine,
│   │   │                   # ThemeToggle, Cursor
│   │   ├── layouts/        # Base.astro (wrapper used by every page)
│   │   ├── styles/         # tokens.css (palette + scale), globals.css
│   │   └── data/
│   │       └── status.yaml # the "currently / reading / location" status line
│   ├── public/             # favicon, static assets
│   ├── astro.config.mjs
│   └── package.json
├── .github/workflows/deploy.yml   # GH Actions: builds site/ and deploys to Pages
├── CLAUDE.md               # this file
├── LICENSE
└── README.md
```

## Run & build

From repo root:

```bash
cd site
npm install                # first time
npm run dev                # http://localhost:4321 — local dev with HMR
npm run build              # production build to site/dist/
npm run preview            # preview the production build
```

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml`, which runs
`withastro/action@v3` against `site/` and publishes the result to GitHub
Pages. Repo Settings → Pages must have **Source: GitHub Actions** (not
"Deploy from a branch").

Astro `site` is set to `https://ayushgupta.github.io` — no base path
needed because this is a user/org site at the root.

## Design system at a glance

- **Concept**: editorial broadsheet meets operator console — "field journal".
- **Palette**: bone `#ECE6D6` + ink `#1A1714` + signal red `#C8201C` by day;
  inverted by night. One accent — never two.
- **Type**: Instrument Serif (display, italics) + Inconsolata (mono, body/UI).
- **Grid**: 12-col asymmetric. Persistent left **margin rail** (~96px) carries
  section index, filed dates, and small annotations on every page.
- **Signature moves**: press-card hero with rotating status line, filed-report
  project cards, drop-cap on notes, ⌘K palette, custom cursor (red dot + ring
  with hover lerp), boot-line on first session.

## Content conventions

- New post: drop an `.mdx` (or `.md`) into `site/src/content/posts/` with
  frontmatter `{ title, date, tags, kind, subtitle?, description? }`. `kind`
  is one of `essay | book-note | research-note`.
- New project: one file in `site/src/content/projects/`. Frontmatter:
  `{ title, category, filed, stack[], outcome, repo?, demo?, featured?, order? }`.
  `category` ∈ `research | applied | workbench`.
- New OSS entry: one file in `site/src/content/oss/`. Frontmatter:
  `{ repo, kind, title, url, filed, status, note }`.
- `/now`: edit `site/src/pages/now.astro` directly — it's a single page,
  not a collection.
- Status line on home: edit `site/src/data/status.yaml`.

## Conventions to keep

- One signature accent (signal red). Don't introduce a second.
- Mono is the system voice; serif is the personal voice. Don't blur them.
- The margin rail appears on every interior page — keep it.
- No second model-name lists, no SaaS-service lists in `/stack`. Stack =
  things you *use* / *build with*, not services you call.
- Tone: builder, not résumé. Restrained, not flashy.

## Known quirks

- Astro `<style>` blocks in `.astro` files are component-scoped by default.
  To target elements outside the component (e.g. `html.has-cursor *`), use
  `<style is:global>` — see `site/src/components/Cursor.astro`.
- View transitions (`ClientRouter`) were removed — they made inline scripts
  hold stale DOM refs and broke navigation. Plain full-page loads are fine.
- Legacy Jekyll URLs (`/YYYY-MM-DD-slug/`) redirect to `/notes/slug/` via
  `site/src/pages/[year]-[month]-[day]-[slug].astro`.

## Don't

- Don't commit `site/node_modules/`, `site/dist/`, or `daily-log.md`.
- Don't restore the Jekyll files — they're preserved in git history if needed.
- Don't add tracking, analytics, or third-party fonts beyond Google Fonts'
  Instrument Serif + Inconsolata.
