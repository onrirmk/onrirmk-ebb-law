import Image from "next/image";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function PracticeAreasHero({
  eyebrow,
  title,
  subtitle,
  imageSrc = "/images/practice-areas/practice-areas-hero.jpg",
  imageAlt = "",
}: Props) {
  return (
    <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-[#212C60] md:min-h-[480px]">
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
      <div className="relative mx-auto flex h-full max-w-[1440px] flex-col items-center justify-center px-[24px] text-center md:px-[100px]">
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
    </section>
  );
}
