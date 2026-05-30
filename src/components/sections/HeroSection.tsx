import Image from "next/image";

type Props = {
  titleLine1: string;
  titleLine2: string;
  imageSrc: string;
  imageAlt: string;
};

export function HeroSection({
  titleLine1,
  titleLine2,
  imageSrc,
  imageAlt,
}: Props) {
  return (
    <section className="relative isolate w-full overflow-hidden">
      <div className="relative mx-auto h-[600px] w-full max-w-[1680px] md:h-screen md:min-h-[600px]">
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
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/15"
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
      </div>
    </section>
  );
}
