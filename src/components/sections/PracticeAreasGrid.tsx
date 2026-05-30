import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { PracticeAreaSummary } from "@/types/content";

type StatItem = { value: string; label: string };

type Props = {
  areas: PracticeAreaSummary[];
  readMoreLabel: string;
  stats?: StatItem[];
};

const PLACEHOLDER_GRADIENTS = [
  "from-primary via-accent to-primary",
  "from-accent via-primary to-accent",
  "from-primary to-accent",
  "from-accent to-primary",
  "from-primary/80 via-accent/90 to-primary",
];

export function PracticeAreasGrid({ areas, readMoreLabel, stats }: Props) {
  return (
    <section className="container-page pb-20 pt-[48px] md:pb-28 md:pt-[72px]">
      {stats && stats.length > 0 ? (
        <div className="mb-12 grid grid-cols-1 gap-y-6 border-y border-[#1C1B1F]/10 py-8 sm:grid-cols-3 sm:divide-x sm:divide-[#1C1B1F]/10 md:mb-16 md:py-10">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-start sm:items-center sm:text-center ${
                i === 0 ? "sm:pl-0" : "sm:pl-6"
              }`}
            >
              <p className="font-sans text-[36px] font-bold leading-[1] text-primary md:text-[44px]">
                {stat.value}
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/60 md:text-[12px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      <ul className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {areas.map((area, i) => (
          <li key={area.slug}>
            <Link
              href={{
                pathname: "/calisma-alanlari/[slug]",
                params: { slug: area.slug },
              }}
              className="group relative flex h-full flex-col overflow-hidden rounded-sm bg-card shadow-[0_1px_2px_rgba(28,27,31,0.06)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_18px_36px_rgba(33,44,96,0.18)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                {area.imageSrc ? (
                  <Image
                    src={area.imageSrc}
                    alt={area.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  <div
                    aria-hidden
                    className={`absolute inset-0 bg-gradient-to-br ${
                      PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length]
                    }`}
                  />
                )}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
              </div>
              <div className="flex flex-1 flex-col py-10 pr-6 md:py-12 md:pr-7">
                <h2 className="font-sans text-[24px] font-semibold leading-[30px] text-primary md:text-[26px] md:leading-[32px]">
                  {area.title}
                </h2>
                <p className="mt-4 flex-1 text-[15px] leading-[24px] text-foreground/75 md:text-[16px]">
                  {area.summary}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">
                  {readMoreLabel}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
