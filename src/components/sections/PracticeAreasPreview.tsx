import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { PracticeAreaSlug } from "@/i18n/routing";

type FeaturedArea = {
  slug: PracticeAreaSlug;
  title: string;
  summary: string;
};

type Props = {
  title: string;
  subtitle: string;
  viewAllLabel: string;
  areas: FeaturedArea[];
};

export function PracticeAreasPreview({
  title,
  subtitle,
  viewAllLabel,
  areas,
}: Props) {
  return (
    <section className="mx-auto max-w-[1680px] px-[24px] pb-[48px] pt-[48px] md:pb-[72px] md:pl-[100px] md:pr-[100px] md:pt-[64px]">
      <h2 className="font-sans text-[28px] font-bold uppercase leading-[36px] tracking-wide text-primary">
        {title}
      </h2>
      <p className="mt-[16px] max-w-[820px] text-[16px] leading-[26px] text-foreground/75 md:text-[18px] md:leading-[30px]">
        {subtitle}
      </p>

      <ul className="mt-[32px] grid grid-cols-1 gap-x-[24px] gap-y-[20px] md:mt-[40px] md:grid-cols-2 lg:grid-cols-3">
        {areas.map((area) => (
          <li key={area.slug}>
            <Link
              href={{
                pathname: "/calisma-alanlari/[slug]",
                params: { slug: area.slug },
              }}
              className="group block border-l-2 border-[#212C60]/20 py-[14px] pl-[20px] transition-all duration-200 hover:border-[#212C60] hover:bg-[#212C60]/[0.02]"
            >
              <h3 className="font-sans text-[20px] font-semibold leading-[28px] text-[#212C60]">
                {area.title}
              </h3>
              <p className="mt-[6px] text-[14px] leading-[22px] text-[#1C1B1F]/70">
                {area.summary}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-[32px] flex justify-start md:mt-[40px]">
        <Link
          href="/calisma-alanlari"
          className="inline-flex items-center gap-[8px] text-[13px] font-semibold uppercase tracking-[0.18em] text-[#212C60] transition-colors hover:text-[#1a234d]"
        >
          {viewAllLabel}
          <ArrowRight className="h-[14px] w-[14px]" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
