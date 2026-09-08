import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TeamMemberDetail } from "@/components/sections/TeamMemberDetail";
import type { TeamMember } from "@/types/content";
import {
  fetchTeamMemberBySlug,
  fetchTeamMembers,
} from "@/sanity/lib/queries";
import { imageHotspotPosition, imageSrc } from "@/sanity/lib/image";
import { getSiteUrl } from "@/lib/site-url";

type Params = { locale: string; slug: string };

export async function generateStaticParams() {
  const members = await fetchTeamMembers();
  return members.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const m = await fetchTeamMemberBySlug(slug);
  if (!m) return {};
  const title = `${m.name} — ${m.position ?? ""}`.trim();
  const bio = (m.biographyParagraphs ?? []).join(" ").trim();
  const description =
    bio.length > 0
      ? bio.slice(0, 155) + (bio.length > 155 ? "…" : "")
      : `${m.name}${m.position ? `, ${m.position}` : ""} at Erçin Bilgin Bektaşoğlu Law Firm.`;
  const canonical = `${getSiteUrl()}/${locale}/team/${m.slug}`;
  const photoUrl = imageSrc(m.photo, 800) ?? undefined;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "profile",
      title,
      description,
      url: canonical,
      images: photoUrl ? [{ url: photoUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: photoUrl ? [photoUrl] : undefined,
    },
  };
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const [t, m] = await Promise.all([
    getTranslations(),
    fetchTeamMemberBySlug(slug),
  ]);

  if (!m) notFound();

  const member: TeamMember = {
    slug: m.slug,
    name: m.name,
    position: m.position ?? "",
    email: m.email ?? "",
    phone: m.phone,
    linkedinUrl: m.linkedinUrl,
    bio: m.biographyParagraphs ?? [],
    practiceAreas: (m.practiceAreas ?? []).map((p) => p.slug),
    education: (m.education ?? []).map((e) => ({
      year: e.year ?? "",
      institution: e.institution ?? "",
      degree: e.degree ?? "",
    })),
    memberships: m.memberships ?? [],
    languages: m.languages ?? [],
    testimonials: (m.testimonials ?? [])
      .filter((tm) => tm.quote && tm.quote.trim().length > 0)
      .map((tm) => ({
        quote: tm.quote ?? "",
        source: tm.source && tm.source.trim() ? tm.source : undefined,
        logoSrc: imageSrc(tm.logo, 400) ?? undefined,
      })),
    photoSrc: imageSrc(m.photo) ?? undefined,
    photoObjectPosition: imageHotspotPosition(m.photo) ?? "50% 20%",
  };

  // Person JSON-LD helps Google understand this is a professional
  // profile page — a strong signal for a new site with lots of
  // similarly-structured team pages waiting in the "discovered but
  // not crawled" queue.
  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/${locale}/team/${member.slug}`;
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    url: canonicalUrl,
    jobTitle: member.position || undefined,
    worksFor: {
      "@type": "LegalService",
      name: "Erçin Bilgin Bektaşoğlu Law Firm",
      url: siteUrl,
    },
    email: member.email ? `mailto:${member.email}` : undefined,
    telephone: member.phone || undefined,
    image: imageSrc(m.photo, 800) ?? undefined,
    sameAs: member.linkedinUrl ? [member.linkedinUrl] : undefined,
    knowsLanguage: member.languages.length > 0 ? member.languages : undefined,
    alumniOf:
      member.education.length > 0
        ? member.education.map((e) => ({
            "@type": "EducationalOrganization",
            name: e.institution,
          }))
        : undefined,
    description: member.bio.join(" ") || undefined,
  };
  // Drop undefined fields so the emitted JSON stays clean.
  Object.keys(jsonLd).forEach((key) => {
    if (jsonLd[key] === undefined) delete jsonLd[key];
  });

  return (
    <>
      <script
        type="application/ld+json"
        // Non-user data assembled server-side from Sanity — safe to
        // stringify; JSON.stringify escapes </ so no early-close.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TeamMemberDetail
        member={member}
        backToTeamLabel={t("team.backToTeam")}
        linkedinLabel={t("team.linkedinLabel")}
        eyebrows={{
          biography: t("team.eyebrows.biography"),
          education: t("team.eyebrows.education"),
          memberships: t("team.eyebrows.memberships"),
          languages: t("team.eyebrows.languages"),
          testimonials: t("team.eyebrows.testimonials"),
        }}
      />
    </>
  );
}
