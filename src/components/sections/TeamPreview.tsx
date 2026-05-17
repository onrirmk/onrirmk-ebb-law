import { ArrowRight, ArrowUpRight, UserCircle2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { TeamMember } from "@/types/content";

type Props = {
  title: string;
  subtitle: string;
  viewAllLabel: string;
  members: Pick<TeamMember, "slug" | "name" | "position">[];
};

export function TeamPreview({
  title,
  subtitle,
  viewAllLabel,
  members,
}: Props) {
  return (
    <section className="mx-auto max-w-[1440px] px-[24px] pb-[48px] pt-[48px] md:pb-[72px] md:pl-[100px] md:pr-[100px] md:pt-[64px]">
      <h2 className="font-sans text-[28px] font-bold uppercase leading-[36px] tracking-wide text-primary">
        {title}
      </h2>
      <p className="mt-[16px] max-w-[820px] text-[16px] leading-[26px] text-foreground/75 md:text-[18px] md:leading-[30px]">
        {subtitle}
      </p>

      <ul className="mt-[32px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:mt-[40px] lg:grid-cols-4">
        {members.map((m) => (
          <li key={m.slug}>
            <Link
              href={{ pathname: "/team/[slug]", params: { slug: m.slug } }}
              className="group flex h-full flex-col overflow-hidden rounded-sm border border-[#1C1B1F]/10 bg-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(33,44,96,0.10)]"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-[#EEF0F5] via-[#E5E8F0] to-[#DCE0EA]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <UserCircle2
                    className="h-[88px] w-[88px] text-[#212C60]/25 md:h-[104px] md:w-[104px]"
                    strokeWidth={1}
                  />
                </div>
                <span className="pointer-events-none absolute right-[10px] top-[10px] flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white/90 text-[#212C60] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <ArrowUpRight className="h-[14px] w-[14px]" aria-hidden />
                </span>
              </div>
              <div className="p-[16px] md:p-[18px]">
                <h3 className="font-sans text-[18px] font-semibold leading-[24px] text-[#212C60] transition-colors group-hover:text-[#1a234d]">
                  {m.name}
                </h3>
                <p className="mt-[2px] text-[13px] font-medium uppercase leading-[18px] tracking-[0.1em] text-[#1C1B1F]/65">
                  {m.position}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-[32px] flex justify-start md:mt-[40px]">
        <Link
          href="/team"
          className="inline-flex items-center gap-[8px] text-[13px] font-semibold uppercase tracking-[0.18em] text-[#212C60] transition-colors hover:text-[#1a234d]"
        >
          {viewAllLabel}
          <ArrowRight className="h-[14px] w-[14px]" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
