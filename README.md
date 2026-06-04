# ayushgupta.github.io

Personal site — `ayushgupta.github.io`. Built with **Astro + MDX**, deployed to GitHub Pages via GitHub Actions. See [`CLAUDE.md`](./CLAUDE.md) for the full project guide.

## Run locally

```bash
cd site
npm install
npm run dev      # http://localhost:4321
npm run build    # production build → site/dist
```

## Deploy

`git push` to `main` triggers `.github/workflows/deploy.yml` (Astro build + GitHub Pages deploy). Pages source must be set to **GitHub Actions** in repo settings.

## Layout

```
site/                 the Astro project
├── src/
│   ├── pages/        routes
│   ├── content/      posts, projects, oss (content collections)
│   ├── components/   Nav, MarginRail, FiledReport, CmdK, Cursor, …
│   ├── layouts/      Base.astro
│   ├── styles/       tokens.css, globals.css
│   └── data/         status.yaml
└── public/
```
