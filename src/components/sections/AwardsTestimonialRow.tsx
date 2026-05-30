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
    <section id="awards-testimonial" className="w-full py-[48px] md:py-[64px]">
      <div className="mx-auto max-w-[1680px] px-[24px] md:pl-[100px] md:pr-[260px]">
        <div className="flex flex-col gap-y-[40px] md:flex-row md:items-start md:gap-y-0">
          <div className="md:w-[198px]">
            <div className="inline-flex flex-col items-center">
              <h2 className="font-sans text-[28px] font-bold uppercase leading-[36px] tracking-wide text-[#212C60]">
                {awardsTitle}
              </h2>
              <div className="mt-[16px]">
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
          </div>

          <div className="hidden md:block md:h-[120px] md:w-px md:bg-[#1C1B1F]/15" />

          <div className="md:ml-[30px] md:flex-1">
            <h2 className="font-sans text-[28px] font-bold uppercase leading-[36px] tracking-wide text-[#212C60]">
              {testimonialTitle}
            </h2>
            <div className="mt-[16px]">
              <TestimonialSlider testimonials={testimonials} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
