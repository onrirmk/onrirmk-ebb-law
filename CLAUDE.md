# eeb-law — Project context for Claude

Marketing website for **Erçin Bilgin Bektaşoğlu Law Firm** (Istanbul). Built from a Figma comp, translated into a Next.js 15 + Tailwind v4 + next-intl app. Brand placeholder in this repo: `eeb-law` (the user renames in deploy).

## Stack

- **Next.js 15** (App Router, src/ layout)
- **TypeScript** (strict)
- **Tailwind CSS v4** (`@theme inline` directive, no `tailwind.config` file)
- **next-intl v4** (currently EN-only; pathnames mapping retained for future TR; `localePrefix: "always"`)
- **Sanity v4** as the content CMS — Studio mounted at `/studio`; content fetched server-side with `revalidate: 10s`
- **shadcn/ui** (`new-york` style, `base-ui` backend, `neutral` palette overridden with EBB brand colors)
- **lucide-react** icons
- **EB Garamond** font via `next/font/google` (latin + latin-ext for Turkish)
- React 19.2

## Content vs UI split

This codebase deliberately separates **editorial content** (Sanity) from **UI labels** (next-intl / `messages/en.json`):

- **Sanity owns** all client-editable content: page titles, body paragraphs, hero text, hero images, team members (name/bio/photo/education/etc.), practice areas, testimonials, awards, office address, phone, email, footer copyright.
- **`messages/en.json` owns** UI structure strings: nav labels, button text ("Read More", "Submit"), form field labels, accessibility text (slider prev/next), section eyebrows ("BIOGRAPHY", "EDUCATION").

Pages call **both** in parallel:

```ts
const [t, data] = await Promise.all([getTranslations(), fetchHomePage()]);
```

Then pass content from `data` and labels from `t()` into typed section props.

## Folder structure

```
src/
  app/
    [locale]/                                # Canonical paths use TR slugs (EN URLs rewritten)
      layout.tsx                             # NextIntlClientProvider + Navbar (with Sanity logo) + Footer
      page.tsx                               # Anasayfa — fetches homePage from Sanity
      hakkimizda/page.tsx                    # /hakkimizda → /en/about — fetches aboutPage + founders
      calisma-alanlari/
        page.tsx                             # /calisma-alanlari → /en/practice-areas — fetches practiceAreasPage + practiceArea[]
        [slug]/page.tsx                      # generateStaticParams from Sanity slugs
      team/
        page.tsx                             # fetches teamPage + teamMember[]
        [slug]/page.tsx                      # generateStaticParams from Sanity slugs
      iletisim/page.tsx                      # /iletisim → /en/contact — fetches contactPage + siteSettings + practiceArea[]
    studio/[[...tool]]/page.tsx              # Sanity Studio mount
    globals.css                              # CSS vars + @theme inline + container-page utility
  components/
    layout/{Navbar,Footer,LanguageSwitcher,PageHeader,SectionDivider}.tsx
    sections/                                # All section components are pure props-driven views
    ui/button.tsx                            # shadcn primitive
  i18n/
    routing.ts                               # defineRouting + pathnames (PRACTICE_AREA_SLUGS retained for legacy/TR restore)
    navigation.ts                            # typed Link, redirect, usePathname, useRouter
    request.ts                               # message loader
  sanity/
    env.ts                                   # projectId/dataset/apiVersion from env
    structure.ts                             # Studio left-rail (singletons + collections)
    schemaTypes/
      index.ts                               # registers all types
      objects/seo.ts
      documents/{homePage,aboutPage,practiceAreasPage,practiceArea,teamPage,teamMember,contactPage,siteSettings}.ts
    lib/
      client.ts                              # next-sanity client (useCdn: true, perspective: "published")
      image.ts                               # SanityImage type + imageSrc helper (URL builder + auto format)
      queries.ts                             # All GROQ queries + result types + fetch* helpers (revalidate: 10s)
  lib/utils.ts                               # shadcn cn() helper
  middleware.ts                              # next-intl middleware
  types/content.ts                           # Award, PracticeAreaSummary, TeamMember, NavLink (consumed by section components)
messages/
  en.json                                    # UI labels only (nav, buttons, form fields, eyebrows)
  tr.json                                    # preserved for future TR restore — NOT in active use
scripts/
  migrate-to-sanity.mjs                      # ⚠️ DESTRUCTIVE one-way seed from messages/en.json + /public to Sanity. Requires --i-know-this-overwrites-studio flag.
public/
  images/{logo,hero,awards,practice-areas,team}/   # seed assets for migration (Sanity now hosts the live copies)
```

## Naming conventions

- **Components**: PascalCase filename, named exports for everything except page.tsx (which uses default export per Next.js convention)
- **Files in src/components**: PascalCase (`HeroSection.tsx`, `Navbar.tsx`)
- **Files elsewhere**: kebab-case (`routing.ts`, `content.ts`)
- **Hooks/utilities**: camelCase
- **Practice area slugs**: kebab-case English (`dispute-resolution`, `insurance-and-reinsurance`)

## Component rules

- **Server component by default.** Only add `"use client"` when state, event handlers, or browser APIs are needed.
- **Props-driven.** No hardcoded copy inside JSX — content comes from Sanity via `src/sanity/lib/queries.ts` helpers (server-side `fetchHomePage()`, `fetchTeamMembers()` etc.), and UI labels come from next-intl via `getTranslations()`. Both are passed into section components as typed props.
- Each section component takes its content as typed props — no section ever calls `client.fetch()` or `getTranslations()` directly. Composition lives in the page file.
- For images, use `imageSrc(sanityImage)` from `src/sanity/lib/image.ts` to get a `cdn.sanity.io` URL (auto format). Pass to `<Image>` with `fill`. Hostname is already allowed in `next.config.ts`.

## Design tokens

Pulled from Figma Variables (frame `5328:825` in the law-firm-landing file). Live in `src/app/globals.css`:

| Token              | Value      | Figma variable           |
|--------------------|------------|---------------------------|
| `--primary`        | `#212C60`  | Primary/Primary           |
| `--accent`         | `#2A446F`  | Text/Bright               |
| `--foreground`     | `#1C1B1F`  | Text/Black                |
| `--background`     | `#FFFFFF`  | Text/White                |
| `--ring`           | `#2A446F`  | derived from Text/Bright  |
| `--radius`         | `0.25rem`  | derived (no Figma var)    |
| Font sans          | EB Garamond | Body-Large-* tokens      |

Tailwind classes available: `bg-primary`, `text-accent`, `border-border`, `font-sans` (EB Garamond), `container-page` (centered max-w-1440 with responsive horizontal padding).

**Pixel-perfect mode** is in effect — when implementing or refining a section, pull exact values from Figma MCP (size, line-height, letter-spacing, color, gap) and prefer Tailwind arbitrary syntax (`text-[40px]`, `tracking-[-0.2px]`) over preset scales when values don't match.

## next-intl usage

Server components:

```tsx
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return <h1>{t("hero.title")}</h1>;
}
```

Client components:

```tsx
"use client";
import { useTranslations } from "next-intl";

export function Foo() {
  const t = useTranslations("nav");
  return <a>{t("home")}</a>;
}
```

Links (use the typed wrapper, not `next/link`):

```tsx
import { Link } from "@/i18n/navigation";

<Link href="/hakkimizda">…</Link>
<Link href={{ pathname: "/calisma-alanlari/[slug]", params: { slug: "aviation" } }}>…</Link>
```

Pathnames mapping (in `src/i18n/routing.ts`) — canonical paths use TR slugs; EN URLs get rewritten:

| Canonical (TR)                  | TR URL                           | EN URL                           |
|---------------------------------|----------------------------------|----------------------------------|
| `/`                             | `/tr`                            | `/en`                            |
| `/hakkimizda`                   | `/tr/hakkimizda`                 | `/en/about`                      |
| `/calisma-alanlari`             | `/tr/calisma-alanlari`           | `/en/practice-areas`             |
| `/calisma-alanlari/[slug]`      | `/tr/calisma-alanlari/aviation`  | `/en/practice-areas/aviation`    |
| `/iletisim`                     | `/tr/iletisim`                   | `/en/contact`                    |

## Adding a shadcn component

```bash
npx shadcn@latest add <component-name>
```

Lands under `src/components/ui/`. Components use `class-variance-authority` + `tailwind-merge`; the `cn()` helper is in `src/lib/utils.ts`.

## Adding content (practice area, team member, etc.)

This is the editor's job in Sanity Studio at `/studio`. No code changes required:

1. Studio → "Practice Areas" → "+ Create new" → fill in title, slug, summary, paragraphs, hero image, sort order → **Publish**
2. Within ~10–20 seconds, the new area appears in:
   - the `/calisma-alanlari` grid
   - sidebar on every other practice area detail page
   - the footer's "Practice Areas" column
   - the contact form's "practice area" dropdown
3. The route `/calisma-alanlari/<new-slug>` is served on-demand (ISR), and on the next full build it gets statically generated.

Same workflow for team members: Studio → "Team Members" → create → publish.

⚠️ **Do not** add new entries by editing `messages/en.json` or running the migration script — that path is dead. Sanity is the source of truth.

## Assets

All live assets now live in **Sanity** (asset library, served via `cdn.sanity.io`). The originals in `public/images/` are only seed copies used by the one-time migration script. Editors upload new versions in Studio with size+safe-area guidance shown below the upload widget (defined in each schema's `description` field, in Turkish).

If a Sanity image is missing for some field, pages fall back to the matching `/public/images/...` path where applicable (Navbar/Footer logo, page heroes). Practice area + team photos have no fallback — they render with a gradient/icon placeholder.

## Dev workflow

```bash
npm run dev     # http://localhost:3000 → redirects to /en
npm run build   # requires Sanity env vars (NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET)
npm run start   # serve production build
npm run lint
npx tsc --noEmit
```

Env vars: see `.env.local.example` and `README.md`. The Studio at `/studio` is part of the same Next.js app — no separate deploy.

Routing smoke test (post-redirect URLs):

```bash
for p in /en /en/about /en/practice-areas /en/practice-areas/aviation /en/team /en/team/seray-kaya /en/contact; do
  curl -sSL -o /dev/null -w "%{http_code} ${p}\n" "http://localhost:3000${p}"
done
```

## Things to know

- **Sanity is live; messages/en.json is UI-only.** Page content (titles, paragraphs, images, team, practice areas, address, etc.) is fetched server-side from Sanity with `revalidate: 10` in every `fetch*` helper. Editor publishes → site updates within ~10–20 sec. UI labels (nav, button text, eyebrows like "BIOGRAPHY") stay in `messages/en.json`.
- **`PRACTICE_AREA_SLUGS` in `routing.ts` is legacy** — kept only because TR restore would need it for `pathnames`. Runtime no longer uses it; slugs come from Sanity at build time via `generateStaticParams`.
- **Migration script is destructive.** `scripts/migrate-to-sanity.mjs` overwrites every page document via `createOrReplace`. After editorial handoff, running it would destroy client edits. The script refuses to run without `--i-know-this-overwrites-studio`.
- **Locale: EN only (temporarily).** TR was disabled before the Monday 2026-05-18 presentation. `messages/tr.json` and `src/components/layout/LanguageSwitcher.tsx` are kept on disk; only `routing.ts` and `Navbar.tsx` reference EN. To restore TR: re-add "tr" to `locales`, set `defaultLocale: "tr"`, uncomment `// tr:` keys in `pathnames`, re-import `LanguageSwitcher` in `Navbar.tsx`. **Note:** Sanity is currently single-locale; TR restoration also needs schema fields like `titleTr` or a `language` document split.
- **Navbar nav links at 18px / tracking-wide**, not Figma's 16px — sanctioned exception for legibility on transparent overlay. Don't "correct" back.
- **Hero is viewport-bound (`md:h-screen`)**, not Figma's static 851px — sanctioned exception so hero stays above-the-fold across viewport sizes. Title is flex-centered (vertical), `md:pl-[160px]` preserved.
- **Anasayfa tipografi 28px standardı, ritim daraltıldı** — Welcome ve Awards/Testimonial eyebrow başlıkları 28px/36px uppercase tracking-wide font-bold (Figma 40px idi). Section padding'leri kısaltıldı (pt-40/48, pb-48/64). Figma'dan sapma, UX kararı — pixel-perfect modu bu section'lar için pasif. Don't "correct" back.
- The Figma comp stacks every page vertically on a single 1440×15049 canvas. Sections were sliced into the route map; About Us, Practice Area details, and the Free Consultation form each live on separate pages now.
- The "Our Team" link in Figma's nav is removed — no team page in the comp.
- `/hakkimizda` shows the About text only. Awards live on the homepage.
- The Free Consultation form lives on `/iletisim` (not in the footer, per design decision).
- Practice area body copy in TR was translated by Claude; Turkish legal terminology should be reviewed before production. Especially: "Reasürans", "Tenfiz", "P&I Kulüpleri", "Konşimento" — confirm these are house style.
- Figma file: `aRarZPC2UQoDtUroPulY4s`, anasayfa root frame node `5328:825`.
