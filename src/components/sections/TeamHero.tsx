type Props = {
  eyebrow: string;
  title: string;
};

export function TeamHero({ eyebrow, title }: Props) {
  return (
    <section className="w-full bg-[#212C60] text-white">
      <div className="mx-auto flex h-[280px] max-w-[1440px] flex-col items-center justify-center px-[24px] text-center md:h-[400px] md:px-[100px]">
        <p className="font-sans text-[13px] font-semibold uppercase leading-[18px] tracking-[0.3em] text-white/70 md:text-[14px] md:leading-[20px]">
          {eyebrow}
        </p>
        <h1 className="mt-[16px] font-sans text-[32px] font-bold leading-[40px] tracking-[-0.2px] text-white md:mt-[20px] md:text-[44px] md:leading-[54px]">
          {title}
        </h1>
        <div
          aria-hidden
          className="mt-[24px] h-px w-[64px] bg-white/50 md:mt-[28px] md:w-[80px]"
        />
      </div>
    </section>
  );
}
