import Image from "next/image";
import { Award as LucideAward } from "lucide-react";
import type { Award } from "@/types/content";
import { TestimonialSlider, type TestimonialItem } from "./TestimonialSlider";

type Props = {
  awardsTitle: string;
  awards: Award[];
  testimonialTitle: string;
  testimonials: TestimonialItem[];
};

export function AwardsTestimonialRow({
  awardsTitle,
  awards,
  testimonialTitle,
  testimonials,
}: Props) {
  const visibleAward = awards[0];

  return (
    <section id="awards-testimonial" className="w-full py-[20px] md:py-[28px]">
      <div className="mx-auto max-w-[1680px] px-[24px] md:pl-[100px] md:pr-[260px]">
        <h2 className="font-sans text-[28px] font-bold uppercase leading-[36px] tracking-wide text-[#212C60]">
          {testimonialTitle}
        </h2>
        <div className="mt-[24px] flex flex-col gap-y-[40px] md:mt-[32px] md:flex-row md:items-start md:gap-y-0">
          <div className="md:w-auto md:shrink-0">
            <div className="inline-flex flex-col items-start">
              {visibleAward?.iconSrc ? (
                <Image
                  src={visibleAward.iconSrc}
                  alt={visibleAward.label}
                  width={97}
                  height={107}
                  className="block h-[107px] w-[97px] object-contain"
                />
              ) : (
                <div
                  aria-label={visibleAward?.label ?? awardsTitle}
                  className="flex h-[107px] w-[97px] items-center justify-center rounded-sm bg-[#212C60]/5 text-[#212C60]"
                >
                  <LucideAward className="h-10 w-10" aria-hidden />
                </div>
              )}
            </div>
          </div>

          <div className="md:ml-[30px] md:flex-1">
            <TestimonialSlider testimonials={testimonials} />
          </div>
        </div>
      </div>
    </section>
  );
}
