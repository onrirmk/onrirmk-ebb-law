type Props = {
  title: string;
  paragraphs: string[];
};

export function AboutNarrative({ title, paragraphs }: Props) {
  return (
    <section className="mx-auto max-w-[1280px] px-[24px] pt-[64px] md:px-[100px] md:pt-[96px]">
      <div className="max-w-[820px]">
        <h2 className="font-sans text-[28px] font-bold leading-[36px] text-[#212C60] md:text-[32px] md:leading-[40px]">
          {title}
        </h2>
        <div className="mt-[20px] space-y-[24px] md:mt-[24px] md:space-y-[28px]">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-[17px] leading-[28px] text-[#1C1B1F] md:text-[18px] md:leading-[30px]"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
