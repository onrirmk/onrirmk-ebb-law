import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutNarrative } from "@/components/sections/AboutNarrative";
import { AboutFoundersGrid } from "@/components/sections/AboutFoundersGrid";
import { AboutCta } from "@/components/sections/AboutCta";
import { fetchAboutPage, fetchTeamMembers } from "@/sanity/lib/queries";
import { imageSrc } from "@/sanity/lib/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  await getTranslations({ locale });
  const about = await fetchAboutPage();
  return { title: about?.pageTitle ?? "About" };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, about, members] = await Promise.all([
    getTranslations(),
    fetchAboutPage(),
    fetchTeamMembers(),
  ]);

  const founders = members
    .filter((m) => m.isFounder)
    .map((m) => ({
      slug: m.slug,
      name: m.name,
      position: m.position ?? "",
      photoSrc: imageSrc(m.photo) ?? undefined,
    }));

  return (
    <>
      <AboutHero
        eyebrow={about?.heroEyebrow ?? ""}
        title={about?.heroTitle ?? ""}
        imageSrc={imageSrc(about?.heroImage) ?? undefined}
        imageAlt={about?.heroTitle ?? ""}
        breadcrumb={{
          home: t("nav.home"),
          current: about?.pageTitle ?? "",
        }}
      />
      <AboutNarrative
        title={about?.pageTitle ?? ""}
        paragraphs={about?.narrativeParagraphs ?? []}
      />
      <AboutFoundersGrid
        title={about?.foundersTitle ?? ""}
        subtitle={about?.foundersSubtitle ?? ""}
        founders={founders}
      />
      <AboutCta
        title={about?.ctaTitle ?? ""}
        subtitle={about?.ctaSubtitle ?? ""}
        button={about?.ctaButton ?? ""}
      />
    </>
  );
}
