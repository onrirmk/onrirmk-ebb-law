import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { WelcomeSection } from "@/components/sections/WelcomeSection";
import { AwardsTestimonialRow } from "@/components/sections/AwardsTestimonialRow";
import { AboutSection } from "@/components/sections/AboutSection";
import { PracticeAreasPreview } from "@/components/sections/PracticeAreasPreview";
import { TeamPreview } from "@/components/sections/TeamPreview";
import { HomeCta } from "@/components/sections/HomeCta";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { Link } from "@/i18n/navigation";
import type { PracticeAreaSlug } from "@/i18n/routing";
import type { TestimonialItem } from "@/components/sections/TestimonialSlider";
import type { Award, TeamMember } from "@/types/content";

const HERO_IMAGE = "/images/hero/istanbul-0819.png";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const awardsRaw = (t.raw("awards.items") as Award[]) ?? [];
  const awards: Award[] = awardsRaw.map((a) => ({
    ...a,
    iconSrc: `/images/awards/${a.key}.png`,
  }));
  const welcomeParagraphs = t.raw("welcome.paragraphs") as string[];
  const aboutParagraphs = t.raw("about.paragraphs") as string[];
  const testimonials = t.raw("testimonial.items") as TestimonialItem[];

  const featuredSlugs = t.raw(
    "home.practicePreview.featuredSlugs"
  ) as PracticeAreaSlug[];
  const featuredAreas = featuredSlugs.map((slug) => ({
    slug,
    title: t(`practiceAreas.areas.${slug}.title`),
    summary: t(`practiceAreas.areas.${slug}.summary`),
  }));

  const allMembers = t.raw("team.members") as TeamMember[];
  const teamPreview = allMembers.slice(0, 4).map((m) => ({
    slug: m.slug,
    name: m.name,
    position: m.position,
  }));

  return (
    <>
      <HeroSection
        titleLine1={t("hero.titleLine1")}
        titleLine2={t("hero.titleLine2")}
        imageSrc={HERO_IMAGE}
        imageAlt={t("hero.imageAlt")}
      />
      <WelcomeSection
        title={t("welcome.title")}
        paragraphs={welcomeParagraphs}
      />
      <SectionDivider />
      <PracticeAreasPreview
        title={t("home.practicePreview.title")}
        subtitle={t("home.practicePreview.subtitle")}
        viewAllLabel={t("home.practicePreview.viewAll")}
        areas={featuredAreas}
      />
      <SectionDivider />
      <AwardsTestimonialRow
        awardsTitle={t("awards.title")}
        awards={awards}
        testimonialTitle={t("testimonial.title")}
        testimonials={testimonials}
      />
      <SectionDivider />
      <AboutSection
        title={t("about.title")}
        paragraphs={aboutParagraphs.slice(0, 2)}
      />
      <div className="mx-auto max-w-[1440px] px-[24px] pb-[16px] md:pl-[100px] md:pr-[260px]">
        <Link
          href="/hakkimizda"
          className="inline-flex items-center gap-[8px] text-[13px] font-semibold uppercase tracking-[0.18em] text-[#212C60] transition-colors hover:text-[#1a234d]"
        >
          {t("about.previewReadMore")}
          <ArrowRight className="h-[14px] w-[14px]" aria-hidden />
        </Link>
      </div>
      <SectionDivider />
      <TeamPreview
        title={t("home.teamPreview.title")}
        subtitle={t("home.teamPreview.subtitle")}
        viewAllLabel={t("home.teamPreview.viewAll")}
        members={teamPreview}
      />
      <HomeCta
        eyebrow={t("home.cta.eyebrow")}
        title={t("home.cta.title")}
        description={t("home.cta.description")}
        primaryButton={t("home.cta.primaryButton")}
        secondaryButton={t("home.cta.secondaryButton")}
      />
    </>
  );
}
