import Image from "next/image";
import { UserCircle2, Mail, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { TeamMember } from "@/types/content";

type Props = {
  member: TeamMember;
  emailLabel: string;
};

export function TeamMemberCard({ member, emailLabel }: Props) {
  return (
    <Link
      href={{ pathname: "/team/[slug]", params: { slug: member.slug } }}
      className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F7]">
        {member.photoSrc ? (
          <Image
            src={member.photoSrc}
            alt={member.name}
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#EEF0F5] via-[#E5E8F0] to-[#DCE0EA]"
          >
            <UserCircle2
              className="h-[120px] w-[120px] text-[#212C60]/30 md:h-[140px] md:w-[140px]"
              strokeWidth={1}
            />
          </div>
        )}
        <span className="pointer-events-none absolute right-[12px] top-[12px] flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white/90 text-[#212C60] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-[16px] w-[16px]" aria-hidden />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-[20px] md:p-[24px]">
        <h3 className="font-sans text-[20px] font-semibold leading-[28px] text-primary md:text-[22px] md:leading-[30px]">
          {member.name}
        </h3>
        <p className="mt-[4px] font-sans text-[14px] font-medium uppercase leading-[20px] tracking-[0.1em] text-accent md:text-[15px]">
          {member.position}
        </p>
        <span
          aria-label={`${emailLabel} ${member.name}`}
          className="mt-[16px] inline-flex items-center gap-[8px] text-[14px] font-medium leading-[20px] text-foreground/70 transition-colors group-hover:text-accent md:text-[15px]"
        >
          <Mail className="h-[16px] w-[16px]" aria-hidden />
          <span className="truncate">{member.email}</span>
        </span>
      </div>
    </Link>
  );
}
