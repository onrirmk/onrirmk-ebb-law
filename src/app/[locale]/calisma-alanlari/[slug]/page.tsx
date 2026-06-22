import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  PracticeAreaDetail,
  PracticeAreaHero,
} from "@/components/sections/PracticeAreaDetail";
import type {
  PracticeAreaDetailContent,
  PracticeAreaSummary,
} from "@/types/content";
import {
  fetchPracticeAreas,
  fetchPracticeAreaBySlug,
  fetchPracticeAreasPage,
} from "@/sanity/lib/queries";
import { imageSrc } from "@/sanity/lib/image";

export async function generateStaticParams() {
  const areas = await fetchPracticeAreas();
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = await fetchPracticeAreaBySlug(slug);
  if (!area) return {};
  return { title: area.title };
}

export default async function PracticeAreaDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const [t, areaDoc, allDocs, page] = await Promise.all([
    getTranslations(),
    fetchPracticeAreaBySlug(slug),
    fetchPracticeAreas(),
    fetchPracticeAreasPage(),
  ]);

  if (!areaDoc) notFound();

  const area: PracticeAreaDetailContent = {
    slug: areaDoc.slug,
    title: areaDoc.title,
    summary: areaDoc.summary ?? "",
    paragraphs: areaDoc.paragraphs ?? [],
    imageSrc: imageSrc(areaDoc.heroImage) ?? undefined,
  };

  const allAreas: PracticeAreaSummary[] = allDocs.map((a) => ({
    slug: a.slug,
    title: a.title,
    summary: a.summary ?? "",
    imageSrc: imageSrc(a.heroImage) ?? undefined,
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
        backLabel={t("practiceAreas.backToPracticeAreas")}
        cta={{
          title: (page?.ctaTitle ?? "").replace(/\{area\}/g, area.title),
          subtitle: page?.ctaSubtitle ?? "",
          button: page?.ctaButton ?? "",
        }}
      />
    </>
  );
}
