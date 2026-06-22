import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutNarrative } from "@/components/sections/AboutNarrative";
import { AboutFoundersGrid } from "@/components/sections/AboutFoundersGrid";
import { AboutCta } from "@/components/sections/AboutCta";
import { getMemberPhotoSrc } from "@/lib/team-photos";
import type { TeamMember } from "@/types/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("pageTitle") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const paragraphs = t.raw("about.paragraphs") as string[];
  const members = t.raw("team.members") as TeamMember[];
  const founders = members.slice(0, 3).map((m) => ({
    slug: m.slug,
    name: m.name,
    position: m.position,
    photoSrc: m.photoSrc ?? getMemberPhotoSrc(m.slug),
  }));

  return (
    <>
      <AboutHero
        eyebrow={t("about.hero.eyebrow")}
        title={t("about.hero.title")}
        breadcrumb={{
          home: t("nav.home"),
          current: t("about.pageTitle"),
        }}
      />
      <AboutNarrative title={t("about.pageTitle")} paragraphs={paragraphs} />
      <AboutFoundersGrid
        title={t("about.founders.title")}
        subtitle={t("about.founders.subtitle")}
        founders={founders}
      />
      <AboutCta
        title={t("about.cta.title")}
        subtitle={t("about.cta.subtitle")}
        button={t("about.cta.button")}
      />
    </>
  );
}
