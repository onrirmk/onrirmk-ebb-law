import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TeamMemberDetail } from "@/components/sections/TeamMemberDetail";
import { getMemberPhotoSrc } from "@/lib/team-photos";
import { PRACTICE_AREA_SLUGS, routing, type PracticeAreaSlug } from "@/i18n/routing";
import type { TeamMember } from "@/types/content";

type Params = { locale: string; slug: string };

async function loadMember(locale: string, slug: string): Promise<TeamMember | null> {
  const t = await getTranslations({ locale });
  const members = t.raw("team.members") as TeamMember[];
  const member = members.find((m) => m.slug === slug);
  if (!member) return null;
  return { ...member, photoSrc: member.photoSrc ?? getMemberPhotoSrc(member.slug) };
}

export async function generateStaticParams() {
  const locale = routing.defaultLocale;
  const t = await getTranslations({ locale });
  const members = t.raw("team.members") as TeamMember[];
  return members.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const member = await loadMember(locale, slug);
  if (!member) return {};
  return {
    title: `${member.name} — ${member.position}`,
  };
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const member = await loadMember(locale, slug);
  if (!member) notFound();

  const t = await getTranslations();

  const practiceAreaTitles = PRACTICE_AREA_SLUGS.reduce(
    (acc, paSlug) => {
      acc[paSlug] = t(`practiceAreas.areas.${paSlug}.title`);
      return acc;
    },
    {} as Record<PracticeAreaSlug, string>
  );

  return (
    <TeamMemberDetail
      member={member}
      backToTeamLabel={t("team.backToTeam")}
      linkedinLabel={t("team.linkedinLabel")}
      eyebrows={{
        expertise: t("team.eyebrows.expertise"),
        biography: t("team.eyebrows.biography"),
        education: t("team.eyebrows.education"),
        memberships: t("team.eyebrows.memberships"),
        languages: t("team.eyebrows.languages"),
      }}
      practiceAreaTitles={practiceAreaTitles}
    />
  );
}
