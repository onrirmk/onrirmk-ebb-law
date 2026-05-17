type Props = {
  title: string;
  eyebrow?: string;
  description?: string;
};

export function PageHeader({ title, eyebrow, description }: Props) {
  return (
    <header className="mx-auto max-w-[1440px] px-[24px] pb-[16px] pt-[40px] md:pb-[20px] md:pl-[100px] md:pr-[260px] md:pt-[48px]">
      {eyebrow ? (
        <p className="font-sans text-[12px] font-semibold uppercase leading-[16px] tracking-[0.3em] text-accent md:text-[13px] md:leading-[18px]">
          {eyebrow}
        </p>
      ) : null}
      <h1
        className={`font-sans text-[24px] font-bold uppercase leading-[32px] tracking-wide text-primary md:text-[28px] md:leading-[36px] ${
          eyebrow ? "mt-[8px] md:mt-[10px]" : ""
        }`}
      >
        {title}
      </h1>
      {description ? (
        <p className="mt-[16px] max-w-[1080px] text-[16px] font-normal leading-[26px] text-foreground/80 md:mt-[20px] md:text-[18px] md:leading-[30px]">
          {description}
        </p>
      ) : null}
    </header>
  );
}
