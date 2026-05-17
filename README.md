<div align="center">

# terminus

### **[aleclowry.com](https://aleclowry.com)**

A personal site for writing, listing things I like, and figuring out what I think by writing it down.

<sub>Built with [Astro](https://astro.build) · [Typst](https://typst.app) · [Shiki](https://shiki.matsu.io) · deployed on [Cloudflare Pages](https://pages.cloudflare.com)</sub>

</div>

---

## Stack

- **Astro** — static site generator, builds to `dist/`
- **Typst** (via `astro-typst`) — alternate authoring format for posts that need math, figures, or typst-specific layout
- **Shiki** — syntax highlighting with paired light/dark themes that switch with the site's theme toggle
- **Cloudflare Pages** — hosting plus CI via its built-in git integration (no GitHub Action in this repo)

## Local development

The repo ships a Nix flake with `node`, `bun`, `typst`, and language servers pinned. With Nix + direnv:

```sh
direnv allow
```

Otherwise install Node 22 manually. Then:

```sh
npm install      # uses .npmrc to apply legacy-peer-deps for an astro-typst quirk
npm run dev      # dev server at localhost:4321 — drafts ARE visible here
npm run build    # static build to dist/ — drafts are excluded
npm run preview  # serve the built dist/ locally
```

## Writing posts

Posts live in `src/content/writing/` and can be either markdown (`.md`) or typst (`.typ`). Both share the same frontmatter schema (`src/content/config.ts`).

### Frontmatter

```yaml
---
title: My Post Title               # required
date: 2026-05-17                   # required, YYYY-MM-DD
description: A one-line summary.   # optional, used for OG + listing pages
draft: true                        # optional, default false
tags: ["topic-a", "topic-b"]       # optional
series:                            # optional
  name: "Series Name"
  part: 1
---
```

For typst posts the same fields go in a `#metadata((...))` block at the top.

### Drafts

Set `draft: true` to keep a post out of production. Drafts render normally in `npm run dev` so you can iterate. Production builds (`npm run build`) filter them out via the `import.meta.env.PROD ? !data.draft : true` check across the writing pages.

To sanity-check that nothing leaks:

```sh
npm run build && grep -r "Title Of Draft" dist/   # should print nothing
```

### Headings

The frontmatter `title:` is rendered as the page `<h1>` automatically. **Don't write a top-level `#` heading in the body** — you'd end up with two `<h1>`s on the page, which is bad for SEO and the auto-generated table of contents (which only picks up `<h2>` and `<h3>`).

Start your section headings at `##` (markdown) or `==` (typst — the system rebases typst headings down by one, so `=` becomes `<h2>`).

### Code blocks

Markdown uses standard fenced blocks. Add an optional filename for a labeled bar above the block:

````md
```rust filename="example.rs"
fn main() { ... }
```
````

Themes are defined in `src/lib/syntax-theme.ts` (`terminus-light` and `terminus-dark`). They follow the site's light/dark toggle automatically — the dual-theme swap CSS lives in `src/layouts/Layout.astro` and covers both `.astro-code` (markdown) and `.shiki` (typst) wrappers.

### Series

Two or more posts with the same `series.name` are grouped on `/writing/series/<slug-of-name>`. Order is determined by `part:` — start at 1 and increment. The post layout wires up automatic previous/next links and a "part X of N" indicator from the series metadata.

### Tags

Entries in `tags: [...]` become clickable chips on the post and feed into `/writing/tags/<tag>` index pages.

## Pages

| Route | Source |
|---|---|
| `/` | `src/pages/index.astro` |
| `/writing` | `src/pages/writing/index.astro` — post index with tag/series filters |
| `/writing/<slug>` | `src/pages/writing/[...slug].astro` — individual post |
| `/writing/series/<series>` | `src/pages/writing/series/[series].astro` |
| `/writing/tags/<tag>` | `src/pages/writing/tags/[tag].astro` |
| `/likes` | `src/pages/likes.astro` — auto-advancing carousel of things I currently like |

## Cloudflare deployments

Deployment is managed entirely by **Cloudflare Pages' git integration** — there is no `.github/workflows` file in this repo. Cloudflare watches the connected GitHub repo and runs the build on its own infrastructure.

### Production

A push to `main` triggers a production build and deploys to **aleclowry.com**.

### Preview deployments

Every push to a non-`main` branch automatically produces a preview deployment at:

```
https://<commit-or-branch>.<project>.pages.dev
```

Pull requests get the same treatment, with the preview URL posted as a check on the PR. This is the right place to eyeball changes against a real Cloudflare environment before merging.

**Heads up — previews are still production builds.** Cloudflare runs `npm run build`, which means `import.meta.env.PROD === true`, which means **drafts are filtered out of previews too**. If you want to share work-in-progress, either:

- Temporarily flip `draft: false` on the PR branch, or
- Just share `npm run dev` over [Cloudflare Tunnel](https://www.cloudflare.com/products/tunnel/) / ngrok / similar.

### Project settings

| Setting | Value |
|---|---|
| Framework preset | None (custom) |
| Build command | `npm install && npm run build` |
| Build output | `dist` |
| Node version | `22` (set via `NODE_VERSION` env var) |
| Production branch | `main` |

The `.npmrc` in this repo sets `legacy-peer-deps=true` so `npm install` works without a flag — that resolves a prerelease-semver peer-dep mismatch in `astro-typst`.

## Project layout

```
src/
  components/      Reusable Astro components
  content/
    writing/       Blog posts (.md / .typ)
    config.ts      Content collection schema (zod)
  layouts/         Layout.astro (chrome), BlogPost.astro (article shell)
  lib/             Typst helpers (theme.typ, a11y.typ) + shiki theme
  pages/           Routes
  utils/           Shared helpers (slug, date formatting)
public/            Static assets (fonts, images) — served at /
```

## License

See [LICENSE](./LICENSE).
