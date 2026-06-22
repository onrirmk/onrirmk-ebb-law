import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TeamMemberDetail } from "@/components/sections/TeamMemberDetail";
import type { TeamMember } from "@/types/content";
import {
  fetchTeamMemberBySlug,
  fetchTeamMembers,
  fetchTeamPage,
} from "@/sanity/lib/queries";
import { imageSrc } from "@/sanity/lib/image";

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
  const { slug } = await params;
  const m = await fetchTeamMemberBySlug(slug);
  if (!m) return {};
  return { title: `${m.name} — ${m.position ?? ""}`.trim() };
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const [t, m, page] = await Promise.all([
    getTranslations(),
    fetchTeamMemberBySlug(slug),
    fetchTeamPage(),
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
    photoSrc: imageSrc(m.photo) ?? undefined,
  };

  return (
    <TeamMemberDetail
      member={member}
      bandImageSrc={imageSrc(page?.detailHeroImage) ?? undefined}
      backToTeamLabel={t("team.backToTeam")}
      linkedinLabel={t("team.linkedinLabel")}
      eyebrows={{
        biography: t("team.eyebrows.biography"),
        education: t("team.eyebrows.education"),
        memberships: t("team.eyebrows.memberships"),
        languages: t("team.eyebrows.languages"),
      }}
    />
  );
}
