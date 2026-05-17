# eeb-law — Project context for Claude

Marketing website for **Erçin Bilgin Bektaşoğlu Law Firm** (Istanbul). Built from a Figma comp, translated into a Next.js 15 + Tailwind v4 + next-intl app. Brand placeholder in this repo: `eeb-law` (the user renames in deploy).

## Stack

- **Next.js 15** (App Router, src/ layout)
- **TypeScript** (strict)
- **Tailwind CSS v4** (`@theme inline` directive, no `tailwind.config` file)
- **next-intl v4** (TR default, EN secondary, `localePrefix: "always"`, pathnames mapping)
- **shadcn/ui** (`new-york` style, `base-ui` backend, `neutral` palette overridden with EBB brand colors)
- **lucide-react** icons
- **EB Garamond** font via `next/font/google` (latin + latin-ext for Turkish)
- React 19.2

## Folder structure

```
src/
  app/
    [locale]/                                # Canonical paths use TR slugs
      layout.tsx                             # html/body + NextIntlClientProvider + Navbar + Footer
      page.tsx                               # Anasayfa
      hakkimizda/page.tsx                    # /hakkimizda  ↔  /about
      calisma-alanlari/
        page.tsx                             # /calisma-alanlari  ↔  /practice-areas
        [slug]/page.tsx                      # 10 practice areas, generateStaticParams
      iletisim/page.tsx                      # /iletisim  ↔  /contact
    globals.css                              # CSS vars + @theme inline + container-page utility
  components/
    layout/
      Navbar.tsx                             # server component
      Footer.tsx                             # server component
      LanguageSwitcher.tsx                   # "use client" — router.replace with locale
    sections/
      HeroSection.tsx
      WelcomeSection.tsx
      AwardsSection.tsx
      TestimonialSection.tsx
      AboutSection.tsx
      PracticeAreasGrid.tsx
      PracticeAreaDetail.tsx
      ContactForm.tsx                        # "use client"
    ui/                                      # shadcn primitives (only button.tsx so far)
  i18n/
    routing.ts                               # defineRouting + pathnames + PRACTICE_AREA_SLUGS
    navigation.ts                            # Link, redirect, usePathname, useRouter
    request.ts                               # message loader
  lib/utils.ts                               # shadcn cn() helper
  middleware.ts                              # next-intl middleware
  types/content.ts                           # Award, PracticeAreaSummary, PracticeAreaDetailContent, NavLink, ContactInfo
messages/
  tr.json                                    # TR copy (canonical content shape)
  en.json                                    # EN copy (verbatim from Figma metadata)
public/
  images/{logo,hero,awards,practice-areas}/  # downloaded from Figma MCP
```

## Naming conventions

- **Components**: PascalCase filename, named exports for everything except page.tsx (which uses default export per Next.js convention)
- **Files in src/components**: PascalCase (`HeroSection.tsx`, `Navbar.tsx`)
- **Files elsewhere**: kebab-case (`routing.ts`, `content.ts`)
- **Hooks/utilities**: camelCase
- **Practice area slugs**: kebab-case English (`dispute-resolution`, `insurance-and-reinsurance`)

## Component rules

- **Server component by default.** Only add `"use client"` when state, event handlers, or browser APIs are needed.
- **Props-driven.** No hardcoded copy inside JSX — text comes from `messages/{locale}.json` via `getTranslations()` (server) or `useTranslations()` (client) and is passed in as props.
- Each section component takes its content as typed props so the page can compose / a CMS could later feed it.
- `t.raw()` is used for arrays/objects (e.g. `t.raw("welcome.paragraphs") as string[]`).

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

## Adding a new practice area

1. Add slug to `PRACTICE_AREA_SLUGS` in `src/i18n/routing.ts`
2. Add `{ title, summary, paragraphs: [] }` under `practiceAreas.areas.<slug>` in both `messages/tr.json` and `messages/en.json`
3. Drop a hero illustration into `public/images/practice-areas/<slug>.png` and pass it via `imageSrc` prop (sections fall back to gradient placeholders when no asset is provided)

The detail page (`/calisma-alanlari/[slug]/page.tsx`) and grid (`/calisma-alanlari/page.tsx`) read the array dynamically — no further changes needed.

## Assets

All assets live in `public/images/` and are pulled from Figma via MCP. Current state (some still pending due to Figma MCP rate limit on Starter plan):

- ✅ `logo/ebb-logo-navbar.png` (Figma node 5895:351 — EBB Logo-01, horizontal)
- ✅ `hero/istanbul-0819.png` (829 KB — warm sunset tones, main hero per Figma node 5910:195)
- ✅ `hero/istanbul-0816.png` (46 KB — alt hero per node 5772:351)
- ✅ `hero/istanbul-mask.png` (alpha mask)
- ⏳ `logo/ebb-logo-footer.png` (EBB Logo-05 — pending)
- ⏳ `awards/*.png` (5 Legal500 EMEA 2025 badges — pending)
- ⏳ `practice-areas/<slug>.png` (10 illustration banners 1240×338 — pending)

## Dev workflow

```bash
npm run dev     # http://localhost:3000 → redirects to /tr
npm run build
npm run lint
npx tsc --noEmit
```

Routing smoke test:

```bash
for p in /tr /tr/hakkimizda /tr/calisma-alanlari /tr/iletisim /en /en/about /en/practice-areas /en/contact; do
  curl -sS -o /dev/null -w "%{http_code} ${p}\n" "http://localhost:3000${p}"
done
```

## Things to know

- **Locale: EN only (temporarily).** TR was disabled before the Monday 2026-05-18 presentation. `messages/tr.json` and `src/components/layout/LanguageSwitcher.tsx` are kept on disk; only `routing.ts` and `Navbar.tsx` reference EN. To restore TR: re-add "tr" to `locales`, set `defaultLocale: "tr"`, uncomment `// tr:` keys in `pathnames`, and re-import `LanguageSwitcher` in `Navbar.tsx`.
- **Navbar nav links at 18px / tracking-wide**, not Figma's 16px — sanctioned exception for legibility on transparent overlay. Don't "correct" back.
- **Hero is viewport-bound (`md:h-screen`)**, not Figma's static 851px — sanctioned exception so hero stays above-the-fold across viewport sizes. Title is flex-centered (vertical), `md:pl-[160px]` preserved.
- **Anasayfa tipografi 28px standardı, ritim daraltıldı** — Welcome ve Awards/Testimonial eyebrow başlıkları 28px/36px uppercase tracking-wide font-bold (Figma 40px idi). Section padding'leri kısaltıldı (pt-40/48, pb-48/64). Figma'dan sapma, UX kararı — pixel-perfect modu bu section'lar için pasif. Don't "correct" back.
- The Figma comp stacks every page vertically on a single 1440×15049 canvas. Sections were sliced into the route map; About Us, Practice Area details, and the Free Consultation form each live on separate pages now.
- The "Our Team" link in Figma's nav is removed — no team page in the comp.
- `/hakkimizda` shows the About text only. Awards live on the homepage.
- The Free Consultation form lives on `/iletisim` (not in the footer, per design decision).
- Practice area body copy in TR was translated by Claude; Turkish legal terminology should be reviewed before production. Especially: "Reasürans", "Tenfiz", "P&I Kulüpleri", "Konşimento" — confirm these are house style.
- Figma file: `aRarZPC2UQoDtUroPulY4s`, anasayfa root frame node `5328:825`.
