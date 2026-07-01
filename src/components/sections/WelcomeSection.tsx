import type { ComponentProps } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/ui/FadeIn";

type LinkHref = ComponentProps<typeof Link>["href"];

type Props = {
  title: string;
  paragraphs: string[];
  ctaLabel?: string;
  ctaHref?: LinkHref;
};

export function WelcomeSection({
  title,
  paragraphs,
  ctaLabel,
  ctaHref,
}: Props) {
  return (
    <section className="mx-auto max-w-[1680px] px-[24px] pb-[24px] pt-[40px] md:pb-[32px] md:pl-[100px] md:pr-[260px] md:pt-[48px]">
      <FadeIn variant="slideUp">
        <h2 className="font-sans text-[28px] font-bold uppercase leading-[36px] tracking-wide text-primary">
          {title}
        </h2>
      </FadeIn>
      <div className="mt-[20px] space-y-6 text-[16px] font-normal leading-[26px] text-foreground/90 md:max-w-[1188px] md:text-[18px] md:leading-[30px]">
        {paragraphs.map((p, i) => (
          <FadeIn key={i} variant="slideUp" delay={120 + i * 80}>
            <p>{p}</p>
          </FadeIn>
        ))}
      </div>
      {ctaLabel && ctaHref ? (
        <FadeIn variant="slideUp" delay={120 + paragraphs.length * 80}>
          <div className="mt-[28px] flex md:mt-[36px] md:max-w-[1188px] md:justify-end">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-[10px] rounded-[2px] border border-primary/30 px-[28px] py-[12px] text-[13px] font-semibold uppercase tracking-[0.18em] text-primary transition-colors hover:border-primary hover:bg-primary/5"
            >
              {ctaLabel}
              <ArrowRight className="h-[14px] w-[14px]" aria-hidden />
            </Link>
          </div>
        </FadeIn>
      ) : null}
    </section>
  );
}
