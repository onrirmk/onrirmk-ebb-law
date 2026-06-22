import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PracticeAreasHero } from "@/components/sections/PracticeAreasHero";
import { PracticeAreasGrid } from "@/components/sections/PracticeAreasGrid";
import type { PracticeAreaSummary } from "@/types/content";
import {
  fetchPracticeAreas,
  fetchPracticeAreasPage,
} from "@/sanity/lib/queries";
import { imageSrc } from "@/sanity/lib/image";
import type { PracticeAreaSlug } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  await getTranslations({ locale });
  const page = await fetchPracticeAreasPage();
  return { title: page?.pageTitle ?? "Practice Areas" };
}

export default async function PracticeAreasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, page, areaDocs] = await Promise.all([
    getTranslations(),
    fetchPracticeAreasPage(),
    fetchPracticeAreas(),
  ]);

  const areas: PracticeAreaSummary[] = areaDocs.map((doc) => ({
    slug: doc.slug as PracticeAreaSlug,
    title: doc.title,
    summary: doc.summary ?? "",
    imageSrc: imageSrc(doc.heroImage) ?? undefined,
  }));

  return (
    <>
      <PracticeAreasHero
        eyebrow={page?.heroEyebrow ?? ""}
        title={page?.heroTitle ?? ""}
        subtitle={page?.heroSubtitle ?? ""}
        imageSrc={imageSrc(page?.heroImage) ?? undefined}
        imageAlt={page?.heroTitle ?? ""}
        breadcrumb={{
          home: t("nav.home"),
          current: page?.pageTitle ?? "",
        }}
      />
      <PracticeAreasGrid
        areas={areas}
        readMoreLabel={t("common.readMore")}
      />
    </>
  );
}
