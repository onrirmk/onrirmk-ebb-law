import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { TeamHero } from "@/components/sections/TeamHero";
import { TeamGrid } from "@/components/sections/TeamGrid";
import type { TeamMember } from "@/types/content";
import { fetchTeamMembers, fetchTeamPage } from "@/sanity/lib/queries";
import { imageSrc } from "@/sanity/lib/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  await getTranslations({ locale });
  const page = await fetchTeamPage();
  return { title: page?.pageTitle ?? "Team" };
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, page, memberDocs] = await Promise.all([
    getTranslations(),
    fetchTeamPage(),
    fetchTeamMembers(),
  ]);

  const members: TeamMember[] = memberDocs.map((m) => ({
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
  }));

  return (
    <>
      <TeamHero
        eyebrow={page?.heroEyebrow ?? ""}
        title={page?.heroTitle ?? ""}
        imageSrc={imageSrc(page?.heroImage) ?? undefined}
        imageAlt={page?.heroTitle ?? ""}
        breadcrumb={{
          home: t("nav.home"),
          current: page?.pageTitle ?? "",
        }}
      />
      <section className="mx-auto max-w-[1680px] px-[24px] pb-[12px] pt-[40px] md:px-[100px] md:pb-[16px] md:pt-[64px]">
        <p className="max-w-[1080px] font-sans text-[16px] font-normal leading-[26px] text-foreground/80 md:text-[18px] md:leading-[30px]">
          {page?.intro ?? ""}
        </p>
      </section>
      <SectionDivider />
      <TeamGrid members={members} emailLabel={t("team.emailLabel")} />
    </>
  );
}
