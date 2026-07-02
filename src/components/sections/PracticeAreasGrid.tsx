"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { PracticeAreaSummary } from "@/types/content";
import { FadeIn } from "@/components/ui/FadeIn";

type Props = {
  areas: PracticeAreaSummary[];
  readMoreLabel: string;
};

const PLACEHOLDER_GRADIENTS = [
  "from-primary via-accent to-primary",
  "from-accent via-primary to-accent",
  "from-primary to-accent",
  "from-accent to-primary",
  "from-primary/80 via-accent/90 to-primary",
];

function norm(s: string): string {
  return s
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function PracticeAreasGrid({ areas, readMoreLabel }: Props) {
  const t = useTranslations("practiceAreas");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = norm(query.trim());
    if (!q) return areas;
    return areas.filter((a) => {
      const haystack = [a.title, a.summary].filter(Boolean).map(norm).join(" ");
      return haystack.includes(q);
    });
  }, [areas, query]);

  return (
    <section className="container-page pb-20 pt-[48px] md:pb-28 md:pt-[72px]">
      <div className="relative mb-[24px] max-w-[520px] md:mb-[36px]">
        <Search
          className="pointer-events-none absolute left-[16px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#1C1B1F]/45"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          aria-label={t("searchPlaceholder")}
          className="w-full rounded-[4px] border border-[#1C1B1F]/15 bg-white py-[12px] pl-[46px] pr-[16px] text-[15px] leading-[24px] text-[#1C1B1F] placeholder:text-[#1C1B1F]/45 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {filtered.length > 0 ? (
        <ul className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((area, i) => (
            <li key={area.slug}>
              <FadeIn variant="slideUp" delay={(i % 3) * 100}>
                <Link
                  href={{
                    pathname: "/calisma-alanlari/[slug]",
                    params: { slug: area.slug },
                  }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[10px] bg-card shadow-[0_1px_2px_rgba(28,27,31,0.06)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_18px_36px_rgba(33,44,96,0.18)]"
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
                  <div className="flex flex-1 flex-col px-6 py-12 md:px-8 md:py-16">
                    <h2 className="font-sans text-[24px] font-semibold leading-[30px] text-primary md:text-[26px] md:leading-[32px]">
                      {area.title}
                    </h2>
                    <p className="mt-5 flex-1 text-[15px] leading-[24px] text-foreground/75 md:text-[16px]">
                      {area.summary}
                    </p>
                    <span className="mt-10 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">
                      {readMoreLabel}
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-[40px] text-[15px] text-[#1C1B1F]/60 md:py-[56px]">
          {t("searchNoResults")}
        </p>
      )}
    </section>
  );
}
