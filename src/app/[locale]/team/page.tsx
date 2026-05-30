import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { TeamHero } from "@/components/sections/TeamHero";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { getMemberPhotoSrc } from "@/lib/team-photos";
import type { TeamMember } from "@/types/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "team" });
  return { title: t("pageTitle") };
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const members = (t.raw("team.members") as TeamMember[]).map((m) => ({
    ...m,
    photoSrc: m.photoSrc ?? getMemberPhotoSrc(m.slug),
  }));

  return (
    <>
      <TeamHero
        eyebrow={t("team.hero.eyebrow")}
        title={t("team.hero.title")}
        breadcrumb={{
          home: t("nav.home"),
          current: t("team.pageTitle"),
        }}
      />
      <section className="mx-auto max-w-[1680px] px-[24px] pb-[12px] pt-[40px] md:px-[100px] md:pb-[16px] md:pt-[64px]">
        <p className="max-w-[1080px] font-sans text-[16px] font-normal leading-[26px] text-foreground/80 md:text-[18px] md:leading-[30px]">
          {t("team.intro")}
        </p>
      </section>
      <SectionDivider />
      <TeamGrid members={members} emailLabel={t("team.emailLabel")} />
    </>
  );
}
