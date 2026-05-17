"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  titleLine1: string;
  titleLine2: string;
  imageSrc: string;
  imageAlt: string;
  previousSlideLabel: string;
  nextSlideLabel: string;
};

export function HeroSection({
  titleLine1,
  titleLine2,
  imageSrc,
  imageAlt,
  previousSlideLabel,
  nextSlideLabel,
}: Props) {
  return (
    <section className="relative isolate w-full overflow-hidden">
      <div className="relative mx-auto h-[600px] w-full max-w-[1440px] md:h-screen md:min-h-[600px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 1440px) 100vw, 1440px"
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-transparent md:from-black/45 md:via-black/15"
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

        <button
          type="button"
          aria-label={previousSlideLabel}
          onClick={() => {
            /* TODO: wire carousel previous */
          }}
          className="absolute top-1/2 z-10 hidden h-[48px] w-[48px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/20 text-white opacity-90 backdrop-blur-sm transition-all hover:bg-black/40 hover:opacity-100 md:left-[24px] md:flex"
        >
          <ChevronLeft
            className="block h-[20px] w-[20px]"
            strokeWidth={2.5}
            aria-hidden
          />
        </button>

        <button
          type="button"
          aria-label={nextSlideLabel}
          onClick={() => {
            /* TODO: wire carousel next */
          }}
          className="absolute top-1/2 z-10 hidden h-[48px] w-[48px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/20 text-white opacity-90 backdrop-blur-sm transition-all hover:bg-black/40 hover:opacity-100 md:right-[24px] md:flex"
        >
          <ChevronRight
            className="block h-[20px] w-[20px]"
            strokeWidth={2.5}
            aria-hidden
          />
        </button>
      </div>
    </section>
  );
}
