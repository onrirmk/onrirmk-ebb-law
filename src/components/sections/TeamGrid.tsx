"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import type { TeamMember } from "@/types/content";
import { TeamMemberCard } from "./TeamMemberCard";
import { FadeIn } from "@/components/ui/FadeIn";

type Props = {
  members: TeamMember[];
  emailLabel: string;
};

function norm(s: string): string {
  return s
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function TeamGrid({ members, emailLabel }: Props) {
  const t = useTranslations("team");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = norm(query.trim());
    if (!q) return members;
    return members.filter((m) => {
      const haystack = [m.name, m.position]
        .filter(Boolean)
        .map(norm)
        .join(" ");
      return haystack.includes(q);
    });
  }, [members, query]);

  return (
    <section className="mx-auto max-w-[1680px] px-[24px] pb-[64px] pt-[16px] md:px-[100px] md:pb-[96px] md:pt-[24px]">
      <div className="relative mb-[24px] max-w-[520px] md:mb-[32px]">
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
        <ul className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-[28px]">
          {filtered.map((member, i) => (
            <li key={member.email || member.name}>
              <FadeIn variant="slideUp" delay={(i % 4) * 90}>
                <TeamMemberCard member={member} emailLabel={emailLabel} />
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
