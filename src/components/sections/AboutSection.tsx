type Props = {
  title?: string;
  paragraphs: string[];
};

export function AboutSection({ title, paragraphs }: Props) {
  return (
    <section className="mx-auto max-w-[1440px] px-[24px] pb-[64px] md:pl-[100px] md:pr-[260px]">
      {title ? (
        <h2 className="font-sans text-[24px] font-bold uppercase leading-[32px] tracking-wide text-primary md:text-[28px] md:leading-[36px]">
          {title}
        </h2>
      ) : null}
      <div
        className={`space-y-6 text-[16px] font-normal leading-[26px] text-foreground/90 md:max-w-[1080px] md:text-[18px] md:leading-[30px] ${
          title ? "mt-[16px] md:mt-[20px]" : ""
        }`}
      >
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}
