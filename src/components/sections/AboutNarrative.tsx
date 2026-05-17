type Props = {
  paragraphs: string[];
  subheaders: string[];
};

export function AboutNarrative({ paragraphs, subheaders }: Props) {
  return (
    <section className="mx-auto max-w-[1280px] px-[24px] pt-[64px] md:px-[100px] md:pt-[96px]">
      <div className="max-w-[820px]">
        {paragraphs.map((p, i) => (
          <article
            key={i}
            className={
              i > 0
                ? "mt-[40px] border-t border-[#1C1B1F]/10 pt-[40px] md:mt-[56px] md:pt-[56px]"
                : ""
            }
          >
            {subheaders[i] ? (
              <p className="mb-[14px] text-[12px] font-semibold uppercase tracking-[0.22em] text-[#212C60]/70 md:mb-[16px] md:text-[13px]">
                {subheaders[i]}
              </p>
            ) : null}
            <p className="text-[17px] leading-[28px] text-[#1C1B1F] md:text-[18px] md:leading-[30px]">
              {p}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
