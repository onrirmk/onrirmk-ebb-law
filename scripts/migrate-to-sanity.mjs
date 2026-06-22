// One-shot migration: messages/en.json + public/images -> Sanity.
//
// Usage:
//   node --env-file=.env.local scripts/migrate-to-sanity.mjs
//
// Idempotent for documents (createOrReplace) but every run re-uploads
// the image assets, so only re-run when you really want to refresh.

import { createClient } from "@sanity/client";
import { readFileSync, createReadStream, existsSync } from "node:fs";
import { basename } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token) throw new Error("Missing SANITY_API_READ_TOKEN (needs Editor permissions)");

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-06-22",
  token,
  useCdn: false,
});

const messages = JSON.parse(readFileSync(resolve(ROOT, "messages/en.json"), "utf8"));

const PRACTICE_AREA_SLUGS = [
  "insurance-and-reinsurance",
  "shipping",
  "aviation",
  "logistics-and-transport",
  "trade-and-commodities",
  "dispute-resolution",
  "corporate-and-commercial",
];

const log = (...a) => console.log("›", ...a);

async function uploadImage(relPath) {
  const abs = resolve(ROOT, "public", relPath.replace(/^\//, ""));
  if (!existsSync(abs)) {
    log(`  ⚠ skip missing image: ${relPath}`);
    return null;
  }
  const filename = basename(abs);
  const asset = await client.assets.upload("image", createReadStream(abs), {
    filename,
  });
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
  };
}

async function run() {
  log("Project:", projectId, "/ dataset:", dataset);

  // ---------- siteSettings ----------
  log("siteSettings");
  const navbarLogo = await uploadImage("/images/logo/ebb-logo-navbar.png");
  const footerLogo = await uploadImage("/images/logo/ebb-logo-footer.png");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    firmName: "Erçin Bilgin Bektaşoğlu Law Firm",
    logoNavbar: navbarLogo ?? undefined,
    logoFooter: footerLogo ?? undefined,
    address: {
      line1: messages.footer.address.line1,
      line2: messages.footer.address.line2,
      line3: messages.footer.address.line3,
      mapsQuery:
        "Now Bomonti Plaza Yeni Yol 1 Sokak Cumhuriyet Mah. 34380 Şişli Istanbul",
    },
    phone: messages.footer.phone,
    fax: messages.footer.fax,
    email: messages.footer.email,
    web: messages.footer.webUrl,
    workingHours: messages.contact.workingHours,
    footerCopy: messages.footer.copyright,
  });

  // ---------- homePage ----------
  log("homePage");
  const heroSlide1 = await uploadImage("/images/hero/istanbul-0819.png");
  const heroSlide2 = await uploadImage("/images/hero/istanbul-tower.jpg");
  const awardEntries = await Promise.all(
    (messages.awards.items || []).map(async (a) => ({
      _key: a.key,
      _type: "award",
      label: a.label,
      icon: await uploadImage(`/images/awards/${a.key}.png`),
    })),
  );

  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    heroTitleLine1: messages.hero.titleLine1,
    heroTitleLine2: messages.hero.titleLine2,
    heroSlides: [
      heroSlide1 && {
        _key: "slide-0819",
        _type: "heroSlide",
        image: heroSlide1,
        alt: messages.hero.imageAlt,
      },
      heroSlide2 && {
        _key: "slide-tower",
        _type: "heroSlide",
        image: heroSlide2,
        alt: messages.hero.towerImageAlt,
      },
    ].filter(Boolean),
    welcomeTitle: messages.welcome.title,
    welcomeParagraphs: messages.welcome.paragraphs,
    testimonialTitle: messages.testimonial.title,
    testimonials: (messages.testimonial.items || []).map((t, i) => ({
      _key: `t-${i}`,
      _type: "testimonial",
      quote: t.quote,
      author: t.author,
      role: t.role,
    })),
    awardsTitle: messages.awards.title,
    awards: awardEntries,
    ctaEyebrow: messages.home.cta.eyebrow,
    ctaTitle: messages.home.cta.title,
    ctaDescription: messages.home.cta.description,
    ctaPrimaryButton: messages.home.cta.primaryButton,
  });

  // ---------- aboutPage ----------
  log("aboutPage");
  const aboutHero = await uploadImage("/images/hero/about-hero.jpg");
  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    pageTitle: messages.about.pageTitle,
    heroEyebrow: messages.about.hero.eyebrow,
    heroTitle: messages.about.hero.title,
    heroImage: aboutHero ?? undefined,
    narrativeParagraphs: messages.about.paragraphs,
    foundersTitle: messages.about.founders.title,
    foundersSubtitle: messages.about.founders.subtitle,
    ctaTitle: messages.about.cta.title,
    ctaSubtitle: messages.about.cta.subtitle,
    ctaButton: messages.about.cta.button,
  });

  // ---------- practiceAreasPage ----------
  log("practiceAreasPage");
  const paHero = await uploadImage("/images/hero/practice-areas-hero.jpg");
  await client.createOrReplace({
    _id: "practiceAreasPage",
    _type: "practiceAreasPage",
    pageTitle: messages.practiceAreas.pageTitle,
    heroEyebrow: messages.practiceAreas.hero.eyebrow,
    heroTitle: messages.practiceAreas.hero.title,
    heroSubtitle: messages.practiceAreas.hero.subtitle,
    heroImage: paHero ?? undefined,
    ctaTitle: messages.practiceAreas.cta.title,
    ctaSubtitle: messages.practiceAreas.cta.subtitle,
    ctaButton: messages.practiceAreas.cta.button,
  });

  // ---------- practiceArea (collection) ----------
  log("practiceArea documents");
  const areaIdBySlug = {};
  for (let i = 0; i < PRACTICE_AREA_SLUGS.length; i++) {
    const slug = PRACTICE_AREA_SLUGS[i];
    const area = messages.practiceAreas.areas[slug];
    if (!area) {
      log(`  ⚠ no JSON entry for ${slug}, skipping`);
      continue;
    }
    const image = await uploadImage(`/images/practice-areas/${slug}.png`);
    const _id = `practiceArea-${slug}`;
    areaIdBySlug[slug] = _id;
    await client.createOrReplace({
      _id,
      _type: "practiceArea",
      title: area.title,
      slug: { _type: "slug", current: slug },
      summary: area.summary,
      heroImage: image ?? undefined,
      paragraphs: area.paragraphs,
      order: (i + 1) * 10,
    });
    log(`  • ${slug}`);
  }

  // ---------- teamPage ----------
  log("teamPage");
  const teamHero = await uploadImage("/images/hero/team-hero.jpg");
  const teamDetailHero = await uploadImage("/images/hero/team-detail-hero.jpg");
  await client.createOrReplace({
    _id: "teamPage",
    _type: "teamPage",
    pageTitle: messages.team.pageTitle,
    heroEyebrow: messages.team.hero.eyebrow,
    heroTitle: messages.team.hero.title,
    heroImage: teamHero ?? undefined,
    detailHeroImage: teamDetailHero ?? undefined,
    intro: messages.team.intro,
  });

  // ---------- teamMember (collection) ----------
  log("teamMember documents");
  const members = messages.team.members || [];
  for (let i = 0; i < members.length; i++) {
    const m = members[i];
    const photo = await uploadImage(`/images/team/${m.slug}.png`);
    const _id = `teamMember-${m.slug}`;
    await client.createOrReplace({
      _id,
      _type: "teamMember",
      name: m.name,
      slug: { _type: "slug", current: m.slug },
      position: m.position,
      photo: photo ?? undefined,
      email: m.email,
      phone: m.phone,
      linkedinUrl: m.linkedinUrl,
      isFounder: i < 3,
      biographyParagraphs: m.bio,
      education: (m.education || []).map((e, idx) => ({
        _key: `edu-${idx}`,
        _type: "educationEntry",
        year: e.year,
        institution: e.institution,
        degree: e.degree,
      })),
      memberships: m.memberships,
      languages: m.languages,
      practiceAreas: (m.practiceAreas || [])
        .map((slug) => areaIdBySlug[slug])
        .filter(Boolean)
        .map((id, idx) => ({
          _key: `pa-${idx}`,
          _type: "reference",
          _ref: id,
        })),
      order: (i + 1) * 10,
    });
    log(`  • ${m.slug}`);
  }

  // ---------- contactPage ----------
  log("contactPage");
  const contactHero = await uploadImage("/images/hero/contact-us.jpg");
  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    pageTitle: messages.contact.pageTitle,
    heroEyebrow: messages.contact.hero?.eyebrow ?? messages.contact.eyebrow,
    heroTitle: messages.contact.hero?.title ?? messages.contact.title,
    heroSubtitle: messages.contact.hero?.subtitle,
    heroImage: contactHero ?? undefined,
    formTitle: messages.contact.formEyebrow,
    formSubtitle: messages.contact.formDescription,
    officeEyebrow: messages.contact.officeEyebrow,
    officeName: messages.contact.officeName,
  });

  log("Done.");
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
