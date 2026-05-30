import Image from "next/image";
import { HeroBreadcrumb } from "./HeroBreadcrumb";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  breadcrumb?: { home: string; current: string };
};

export function ContactHero({
  eyebrow,
  title,
  subtitle,
  imageSrc = "/images/hero/contact-us.jpg",
  imageAlt = "",
  breadcrumb,
}: Props) {
  return (
    <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden bg-[#212C60] md:min-h-[540px]">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      ) : null}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/45"
      />
      <div className="relative mx-auto flex h-full max-w-[1680px] flex-col items-center justify-center px-[24px] pt-[122px] text-center md:px-[100px]">
        <p className="font-sans text-[13px] font-semibold uppercase leading-[18px] tracking-[0.3em] text-white/80 md:text-[14px] md:leading-[20px]">
          {eyebrow}
        </p>
        <h1 className="mt-[16px] max-w-[820px] font-sans text-[32px] font-bold leading-[40px] tracking-[-0.2px] text-white md:mt-[20px] md:text-[48px] md:leading-[58px]">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-[16px] max-w-[760px] font-sans text-[16px] font-normal leading-[26px] text-white/85 md:mt-[20px] md:text-[18px] md:leading-[30px]">
            {subtitle}
          </p>
        ) : null}
        <div
          aria-hidden
          className="mt-[24px] h-px w-[64px] bg-white/50 md:mt-[28px] md:w-[80px]"
        />
      </div>
      {breadcrumb ? (
        <div className="absolute inset-x-0 bottom-[20px] z-10 md:bottom-[28px]">
          <div className="mx-auto max-w-[1680px] px-[24px] md:px-[100px]">
            <HeroBreadcrumb
              homeLabel={breadcrumb.home}
              current={breadcrumb.current}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
