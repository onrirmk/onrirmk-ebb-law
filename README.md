# eeb-law

Marketing website for Erçin Bilgin Bektaşoğlu Law Firm. Next.js 15 + Tailwind v4 + next-intl + Sanity CMS.

## Local development

```bash
npm install
cp .env.local.example .env.local   # then fill in the values
npm run dev
```

Visit:
- `http://localhost:3000` — the site
- `http://localhost:3000/studio` — Sanity Studio (CMS)

## Required environment variables

Both local dev and the deployment host (Vercel etc.) need these. Without them the app throws at startup.

| Variable | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `ihcvo75q` | Sanity project id (public, safe to expose) |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Sanity dataset name |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2026-06-22` | Optional; defaults to this date in `src/sanity/env.ts` |

For the one-time migration script only:

| Variable | Notes |
|---|---|
| `SANITY_API_READ_TOKEN` | A Sanity token with **Editor** permissions. Used to write content + upload assets. Never expose to the browser. |

## Content workflow

The Sanity Studio at `/studio` is the source of truth for **all editorial content** — titles, paragraphs, images, team members, practice areas, awards, testimonials, office address. Pages re-fetch from Sanity with `revalidate: 10s`, so Publish-to-visible takes ~10–20 seconds.

UI labels (nav names, button text, form field labels, section eyebrows like "BIOGRAPHY") live in `messages/en.json` and are NOT editable in Studio — these are developer concerns.

## Migration script (DO NOT run after handoff)

`scripts/migrate-to-sanity.mjs` bootstraps Sanity from `messages/en.json` and `/public/images`. It uses `createOrReplace`, which means every run **overwrites** Studio with the seed data — destroying any edits the client has made. The script refuses to run without the `--i-know-this-overwrites-studio` flag for this reason.

## Commands

```bash
npm run dev      # local dev
npm run build    # production build (requires Sanity env vars)
npm run start    # serve production build
npm run lint     # eslint
npx tsc --noEmit # typecheck
```

## Stack notes

- Next.js 15 App Router (src/), React 19
- Tailwind v4 (`@theme inline`, no `tailwind.config`)
- next-intl v4 (currently EN-only; TR support preserved on disk, see `CLAUDE.md`)
- Sanity v4 (Studio mounted at `/studio`)
- shadcn/ui (`new-york` style, neutral palette overridden with EBB brand colors)
- EB Garamond via `next/font/google`

See `CLAUDE.md` for full architectural context.
