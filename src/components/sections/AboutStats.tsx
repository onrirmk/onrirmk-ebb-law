type StatItem = { value: string; label: string };

type Props = {
  stats: StatItem[];
};

export function AboutStats({ stats }: Props) {
  return (
    <section className="mx-auto max-w-[1280px] px-[24px] pt-[48px] md:px-[100px] md:pt-[72px]">
      <div className="grid grid-cols-2 gap-y-8 border-y border-[#1C1B1F]/10 py-[32px] sm:grid-cols-4 sm:divide-x sm:divide-[#1C1B1F]/10 md:py-[40px]">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col items-start sm:items-center sm:text-center ${
              i === 0 ? "sm:pl-0" : "sm:pl-6"
            }`}
          >
            <p className="font-sans text-[32px] font-bold leading-[1] text-[#212C60] md:text-[44px]">
              {stat.value}
            </p>
            <p className="mt-[8px] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1C1B1F]/60 md:text-[12px]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
