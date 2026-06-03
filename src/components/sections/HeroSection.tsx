"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = { src: string; alt: string };

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

  return (
    <section className="relative isolate w-full overflow-hidden">
      <div className="relative mx-auto h-[600px] w-full max-w-[1680px] md:h-screen md:min-h-[600px]">
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
            style={{ objectPosition: "70% 22%" }}
          />
        ))}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/50 via-black/15 to-transparent"
        />

        <div className="absolute inset-0 flex flex-col items-start justify-center px-6 md:pl-[160px] md:pr-[96px]">
          <h1 className="font-sans font-semibold tracking-[-0.2px] text-white">
            <span className="block max-w-[760px] text-[28px] leading-[40px] md:text-[36px] md:leading-[52px]">
              {titleLine1}
            </span>
            <span className="mt-[8px] block max-w-[760px] text-[28px] leading-[40px] md:mt-[12px] md:text-[36px] md:leading-[52px]">
              {titleLine2}
            </span>
          </h1>
        </div>

        {slideCount > 1 ? (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label={previousLabel}
              className="absolute left-[16px] top-1/2 z-10 -translate-y-1/2 inline-flex h-[44px] w-[44px] items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/55 md:left-[40px]"
            >
              <ChevronLeft className="h-[20px] w-[20px]" aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label={nextLabel}
              className="absolute right-[16px] top-1/2 z-10 -translate-y-1/2 inline-flex h-[44px] w-[44px] items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/55 md:right-[40px]"
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
