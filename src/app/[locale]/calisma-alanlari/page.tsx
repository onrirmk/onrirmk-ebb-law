import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PracticeAreasHero } from "@/components/sections/PracticeAreasHero";
import { PracticeAreasGrid } from "@/components/sections/PracticeAreasGrid";
import { PRACTICE_AREA_SLUGS } from "@/i18n/routing";
import type { PracticeAreaSummary } from "@/types/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "practiceAreas",
  });
  return { title: t("pageTitle") };
}

export default async function PracticeAreasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const areas: PracticeAreaSummary[] = PRACTICE_AREA_SLUGS.map((slug) => ({
    slug,
    title: t(`practiceAreas.areas.${slug}.title`),
    summary: t(`practiceAreas.areas.${slug}.summary`),
    imageSrc: `/images/practice-areas/${slug}.png`,
  }));

  const stats = [
    {
      value: t("practiceAreas.stats.areasValue"),
      label: t("practiceAreas.stats.areasLabel"),
    },
    {
      value: t("practiceAreas.stats.yearsValue"),
      label: t("practiceAreas.stats.yearsLabel"),
    },
    {
      value: t("practiceAreas.stats.scopeValue"),
      label: t("practiceAreas.stats.scopeLabel"),
    },
  ];

  return (
    <>
      <PracticeAreasHero
        eyebrow={t("practiceAreas.hero.eyebrow")}
        title={t("practiceAreas.hero.title")}
        subtitle={t("practiceAreas.hero.subtitle")}
      />
      <PracticeAreasGrid
        areas={areas}
        readMoreLabel={t("common.readMore")}
        stats={stats}
      />
    </>
  );
}
