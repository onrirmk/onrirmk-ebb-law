import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutStats } from "@/components/sections/AboutStats";
import { AboutNarrative } from "@/components/sections/AboutNarrative";
import { AboutFoundersGrid } from "@/components/sections/AboutFoundersGrid";
import { AboutTimeline } from "@/components/sections/AboutTimeline";
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
  const subheaders = t.raw("about.subheaders") as string[];
  const stats = t.raw("about.stats") as { value: string; label: string }[];
  const timelineItems = t.raw("about.timeline.items") as {
    year: string;
    text: string;
  }[];
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
      />
      <AboutStats stats={stats} />
      <AboutNarrative paragraphs={paragraphs} subheaders={subheaders} />
      <AboutFoundersGrid
        eyebrow={t("about.founders.eyebrow")}
        title={t("about.founders.title")}
        subtitle={t("about.founders.subtitle")}
        founders={founders}
      />
      <AboutTimeline
        eyebrow={t("about.timeline.eyebrow")}
        title={t("about.timeline.title")}
        items={timelineItems}
      />
      <AboutCta
        title={t("about.cta.title")}
        subtitle={t("about.cta.subtitle")}
        button={t("about.cta.button")}
      />
    </>
  );
}
