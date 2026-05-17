"use client";

import { useCallback, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export type TestimonialItem = {
  quote: string;
  source?: string;
};

type Props = {
  testimonials: TestimonialItem[];
};

export function TestimonialSlider({ testimonials }: Props) {
  const t = useTranslations("testimonial");
  const [activeIndex, setActiveIndex] = useState(0);
  const total = testimonials.length;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % total) + total) % total);
    },
    [total],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  const active = testimonials[activeIndex];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={t("title")}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
    >
      <p
        key={activeIndex}
        aria-live="polite"
        className="font-sans text-[16px] font-normal leading-[28px] tracking-[0.06px] text-[#1C1B1F] animate-in fade-in duration-300 md:text-[18px] md:leading-[30px]"
      >
        {active.quote}
      </p>

      <div className="mt-[16px] flex items-center justify-between gap-[16px]">
        <div className="flex items-center gap-[8px]" role="tablist" aria-label={t("title")}>
          {testimonials.map((_, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-current={isActive ? "true" : undefined}
                aria-label={t("goToLabel", { index: i + 1 })}
                onClick={() => goTo(i)}
                className={`h-[6px] w-[6px] rounded-full transition-colors ${
                  isActive ? "bg-[#212C60]" : "bg-[#1C1B1F]/20 hover:bg-[#1C1B1F]/40"
                }`}
              />
            );
          })}
        </div>

        <div className="flex items-center gap-[4px]">
          <button
            type="button"
            aria-label={t("previous")}
            onClick={goPrev}
            className="rounded-sm p-2 text-accent transition-colors hover:bg-black/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            <ChevronLeft className="h-[20px] w-[20px]" aria-hidden />
          </button>
          <button
            type="button"
            aria-label={t("next")}
            onClick={goNext}
            className="rounded-sm p-2 text-accent transition-colors hover:bg-black/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            <ChevronRight className="h-[20px] w-[20px]" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
