"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

type Slide = { src: string; alt: string; objectPosition?: string };

type Props = {
  titleLine1: string;
  titleLine2: string;
  slides: Slide[];
  previousLabel: string;
  nextLabel: string;
  autoRotateMs?: number;
};

export function HeroSection({
  titleLine1,
  titleLine2,
  slides,
  previousLabel,
  nextLabel,
  autoRotateMs = 6000,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = slides.length;

  useEffect(() => {
    if (slideCount <= 1) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % slideCount);
    }, autoRotateMs);
    return () => window.clearInterval(id);
  }, [slideCount, autoRotateMs]);

  const goTo = (i: number) => setActiveIndex(((i % slideCount) + slideCount) % slideCount);
  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  const touchStartX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 50;

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    if (delta < 0) goNext();
    else goPrev();
  };

  return (
    <section className="relative isolate w-full overflow-hidden">
      <div
        className="relative mx-auto h-[70vh] min-h-[480px] w-full max-w-[1680px] touch-pan-y md:h-screen md:min-h-[600px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="(max-width: 1440px) 100vw, 1440px"
            className={`object-cover transition-opacity duration-700 ease-out ${
              i === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ objectPosition: slide.objectPosition ?? "50% 50%" }}
          />
        ))}

        <div className="absolute inset-0 flex flex-col items-start justify-start px-6 pt-[240px] md:pl-[205px] md:pr-[96px] md:pt-[calc(38vh-20px)]">
          <h1 className="font-sans font-semibold tracking-[-0.2px] text-white">
            <FadeIn variant="slideUp" immediate duration={900}>
              <span className="block max-w-[760px] text-[28px] leading-[40px] md:text-[36px] md:leading-[52px]">
                {titleLine1}
              </span>
            </FadeIn>
            <FadeIn variant="slideUp" immediate duration={900} delay={180}>
              <span className="mt-[8px] block max-w-[760px] text-[28px] leading-[40px] md:mt-[12px] md:text-[36px] md:leading-[52px]">
                {titleLine2}
              </span>
            </FadeIn>
          </h1>
        </div>

        {slideCount > 1 ? (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label={previousLabel}
              className="absolute left-[16px] top-1/2 z-10 hidden h-[44px] w-[44px] -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/55 md:left-[40px] md:inline-flex"
            >
              <ChevronLeft className="h-[20px] w-[20px]" aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label={nextLabel}
              className="absolute right-[16px] top-1/2 z-10 hidden h-[44px] w-[44px] -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/55 md:right-[40px] md:inline-flex"
            >
              <ChevronRight className="h-[20px] w-[20px]" aria-hidden />
            </button>

            <div className="absolute bottom-[24px] left-1/2 z-10 -translate-x-1/2 md:bottom-[40px]">
              <ol className="flex items-center gap-[10px]">
                {slides.map((_, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-label={`Slide ${i + 1}`}
                        aria-current={isActive ? "true" : undefined}
                        className={`block h-[8px] rounded-full transition-all duration-300 ${
                          isActive
                            ? "w-[28px] bg-white"
                            : "w-[8px] bg-white/45 hover:bg-white/70"
                        }`}
                      />
                    </li>
                  );
                })}
              </ol>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
