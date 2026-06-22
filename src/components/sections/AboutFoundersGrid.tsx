import Image from "next/image";
import { UserCircle2, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { TeamMember } from "@/types/content";

type Props = {
  title: string;
  subtitle: string;
  founders: Pick<TeamMember, "slug" | "name" | "position" | "photoSrc">[];
};

export function AboutFoundersGrid({
  title,
  subtitle,
  founders,
}: Props) {
  return (
    <section className="mx-auto max-w-[1280px] px-[24px] pt-[64px] md:px-[100px] md:pt-[96px]">
      <div className="max-w-[820px]">
        <h2 className="font-sans text-[28px] font-bold leading-[36px] text-[#212C60] md:text-[32px] md:leading-[40px]">
          {title}
        </h2>
        <p className="mt-[12px] text-[16px] leading-[26px] text-[#1C1B1F]/75 md:text-[17px] md:leading-[28px]">
          {subtitle}
        </p>
      </div>

      <ul className="mt-[32px] grid grid-cols-1 gap-[24px] sm:grid-cols-2 md:mt-[40px] lg:grid-cols-3">
        {founders.map((f) => (
          <li key={f.slug}>
            <Link
              href={{ pathname: "/team/[slug]", params: { slug: f.slug } }}
              className="group flex h-full flex-col overflow-hidden rounded-sm border border-[#1C1B1F]/10 bg-card transition-shadow hover:shadow-[0_12px_28px_rgba(33,44,96,0.10)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#EEF0F5] via-[#E5E8F0] to-[#DCE0EA]">
                {f.photoSrc ? (
                  <Image
                    src={f.photoSrc}
                    alt={f.name}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <UserCircle2
                      className="h-[100px] w-[100px] text-[#212C60]/25 md:h-[120px] md:w-[120px]"
                      strokeWidth={1}
                    />
                  </div>
                )}
                <span className="pointer-events-none absolute right-[12px] top-[12px] flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white/90 text-[#212C60] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <ArrowUpRight className="h-[16px] w-[16px]" aria-hidden />
                </span>
              </div>
              <div className="p-[20px] md:p-[24px]">
                <h3 className="font-sans text-[20px] font-semibold leading-[28px] text-[#212C60] md:text-[22px] md:leading-[30px]">
                  {f.name}
                </h3>
                <p className="mt-[4px] text-[13px] font-medium uppercase leading-[20px] tracking-[0.12em] text-[#1C1B1F]/65 md:text-[14px]">
                  {f.position}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
