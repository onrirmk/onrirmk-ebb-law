import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { WelcomeSection } from "@/components/sections/WelcomeSection";
import { AwardsTestimonialRow } from "@/components/sections/AwardsTestimonialRow";
import { HomeCta } from "@/components/sections/HomeCta";
import { SectionDivider } from "@/components/layout/SectionDivider";
import type { TestimonialItem } from "@/components/sections/TestimonialSlider";
import type { Award } from "@/types/content";
import { fetchHomePage } from "@/sanity/lib/queries";
import { imageSrc, imageHotspotPosition } from "@/sanity/lib/image";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, home] = await Promise.all([getTranslations(), fetchHomePage()]);

  type Slide = { src: string; alt: string; objectPosition?: string };
  const slides: Slide[] = (home?.heroSlides ?? []).flatMap((s) => {
    const src = imageSrc(s.image);
    if (!src) return [];
    const objectPosition = imageHotspotPosition(s.image);
    return [{
      src,
      alt: s.alt ?? "",
      ...(objectPosition ? { objectPosition } : {}),
    }];
  });

  const awards: Award[] = (home?.awards ?? []).map((a) => ({
    key: a._key,
    label: a.label ?? "",
    iconSrc: imageSrc(a.icon) ?? undefined,
  }));

  const testimonials: TestimonialItem[] = (home?.testimonials ?? []).map((tm) => ({
    quote: tm.quote ?? "",
    author: tm.author ?? "",
    role: tm.role ?? "",
  }));

  return (
    <>
      <HeroSection
        titleLine1={home?.heroTitleLine1 ?? ""}
        titleLine2={home?.heroTitleLine2 ?? ""}
        slides={slides}
        previousLabel={t("hero.previousSlide")}
        nextLabel={t("hero.nextSlide")}
      />
      <WelcomeSection
        title={home?.welcomeTitle ?? ""}
        paragraphs={home?.welcomeParagraphs ?? []}
        ctaLabel={t("about.previewReadMore")}
        ctaHref="/hakkimizda"
      />
      <SectionDivider />
      <AwardsTestimonialRow
        awardsTitle={home?.awardsTitle ?? ""}
        awards={awards}
        testimonialTitle={home?.testimonialTitle ?? ""}
        testimonials={testimonials}
      />
      <HomeCta
        eyebrow={home?.ctaEyebrow ?? ""}
        title={home?.ctaTitle ?? ""}
        description={home?.ctaDescription ?? ""}
        primaryButton={home?.ctaPrimaryButton ?? ""}
      />
    </>
  );
}
