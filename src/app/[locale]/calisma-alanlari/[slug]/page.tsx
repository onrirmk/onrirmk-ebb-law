import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  PracticeAreaDetail,
  PracticeAreaHero,
} from "@/components/sections/PracticeAreaDetail";
import {
  PRACTICE_AREA_SLUGS,
  type PracticeAreaSlug,
} from "@/i18n/routing";
import type {
  PracticeAreaDetailContent,
  PracticeAreaSummary,
} from "@/types/content";

function isKnownSlug(value: string): value is PracticeAreaSlug {
  return (PRACTICE_AREA_SLUGS as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return PRACTICE_AREA_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isKnownSlug(slug)) return {};
  const t = await getTranslations({ locale });
  return { title: t(`practiceAreas.areas.${slug}.title`) };
}

export default async function PracticeAreaDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isKnownSlug(slug)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();

  const area: PracticeAreaDetailContent = {
    slug,
    title: t(`practiceAreas.areas.${slug}.title`),
    summary: t(`practiceAreas.areas.${slug}.summary`),
    paragraphs: t.raw(`practiceAreas.areas.${slug}.paragraphs`) as string[],
    imageSrc: `/images/practice-areas/${slug}.png`,
  };

  const allAreas: PracticeAreaSummary[] = PRACTICE_AREA_SLUGS.map((s) => ({
    slug: s,
    title: t(`practiceAreas.areas.${s}.title`),
    summary: t(`practiceAreas.areas.${s}.summary`),
    imageSrc: `/images/practice-areas/${s}.png`,
  }));

  return (
    <>
      <PracticeAreaHero
        imageSrc={area.imageSrc}
        alt={area.title}
        eyebrow={t("practiceAreas.sectionEyebrow")}
        title={area.title}
      />
      <PracticeAreaDetail
        area={area}
        allAreas={allAreas}
        sidebarLabel={t("practiceAreas.sidebarLabel")}
        cta={{
          title: t("practiceAreas.cta.title", { area: area.title }),
          subtitle: t("practiceAreas.cta.subtitle"),
          button: t("practiceAreas.cta.button"),
        }}
      />
    </>
  );
}
