import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { WelcomeSection } from "@/components/sections/WelcomeSection";
import { AwardsTestimonialRow } from "@/components/sections/AwardsTestimonialRow";
import { HomeCta } from "@/components/sections/HomeCta";
import { SectionDivider } from "@/components/layout/SectionDivider";
import type { TestimonialItem } from "@/components/sections/TestimonialSlider";
import type { Award } from "@/types/content";

const HERO_SLIDES = [
  { src: "/images/hero/istanbul-0819.png", altKey: "hero.imageAlt" },
  { src: "/images/hero/istanbul-tower.jpg", altKey: "hero.towerImageAlt" },
] as const;

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
  const testimonials = t.raw("testimonial.items") as TestimonialItem[];

  return (
    <>
      <HeroSection
        titleLine1={t("hero.titleLine1")}
        titleLine2={t("hero.titleLine2")}
        slides={HERO_SLIDES.map((s) => ({
          src: s.src,
          alt: t(s.altKey),
        }))}
        previousLabel={t("hero.previousSlide")}
        nextLabel={t("hero.nextSlide")}
      />
      <WelcomeSection
        title={t("welcome.title")}
        paragraphs={welcomeParagraphs}
      />
      <SectionDivider />
      <AwardsTestimonialRow
        awardsTitle={t("awards.title")}
        awards={awards}
        testimonialTitle={t("testimonial.title")}
        testimonials={testimonials}
      />
      <HomeCta
        eyebrow={t("home.cta.eyebrow")}
        title={t("home.cta.title")}
        description={t("home.cta.description")}
        primaryButton={t("home.cta.primaryButton")}
      />
    </>
  );
}
