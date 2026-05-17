type TimelineItem = { year: string; text: string };

type Props = {
  eyebrow: string;
  title: string;
  items: TimelineItem[];
};

export function AboutTimeline({ eyebrow, title, items }: Props) {
  return (
    <section className="mx-auto max-w-[1280px] px-[24px] pt-[64px] md:px-[100px] md:pt-[96px]">
      <div className="max-w-[820px]">
        <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#212C60]/70 md:text-[13px]">
          {eyebrow}
        </p>
        <h2 className="mt-[12px] font-sans text-[28px] font-bold leading-[36px] text-[#212C60] md:text-[32px] md:leading-[40px]">
          {title}
        </h2>
      </div>

      <ol className="relative mt-[32px] max-w-[820px] border-l-2 border-[#212C60]/15 md:mt-[40px]">
        {items.map((item, i) => (
          <li
            key={item.year}
            className={`relative pl-[28px] ${
              i < items.length - 1 ? "pb-[28px] md:pb-[36px]" : ""
            }`}
          >
            <span
              aria-hidden
              className="absolute left-[-7px] top-[6px] block h-[12px] w-[12px] rounded-full border-2 border-[#212C60] bg-white"
            />
            <p className="font-sans text-[20px] font-bold leading-[28px] text-[#212C60] md:text-[22px]">
              {item.year}
            </p>
            <p className="mt-[6px] text-[15px] leading-[24px] text-[#1C1B1F]/80 md:text-[16px] md:leading-[26px]">
              {item.text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
