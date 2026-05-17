import Image from "next/image";
import { UserCircle2, Mail, Phone } from "lucide-react";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
import { Link } from "@/i18n/navigation";
import type { PracticeAreaSlug } from "@/i18n/routing";
import type { TeamMember } from "@/types/content";

type Props = {
  member: TeamMember;
  expertiseLabel: string;
  linkedinLabel: string;
  practiceAreaTitles: Record<PracticeAreaSlug, string>;
};

export function TeamMemberSidebar({
  member,
  expertiseLabel,
  linkedinLabel,
  practiceAreaTitles,
}: Props) {
  return (
    <aside className="md:sticky md:top-[120px] md:self-start">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F5F5F5]">
        {member.photoSrc ? (
          <Image
            src={member.photoSrc}
            alt={member.name}
            fill
            sizes="(min-width: 768px) 400px, 100vw"
            className="object-cover"
            priority
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center"
          >
            <UserCircle2
              className="h-[80px] w-[80px] text-[#1C1B1F]/30"
              strokeWidth={1}
            />
          </div>
        )}
      </div>

      <div className="mt-[24px]">
        <h1 className="font-sans text-[28px] font-bold leading-[36px] text-[#212C60]">
          {member.name}
        </h1>
        <p className="mt-[4px] font-sans text-[16px] leading-[24px] text-[#1C1B1F]/70">
          {member.position}
        </p>
      </div>

      <div className="mt-[24px] flex flex-col gap-[12px] border-t border-[#1C1B1F]/10 pt-[24px]">
        <a
          href={`mailto:${member.email}`}
          className="group inline-flex items-center gap-[12px] text-[15px] leading-[24px] text-[#1C1B1F] transition-colors hover:text-[#212C60]"
        >
          <Mail className="h-[18px] w-[18px] flex-shrink-0 text-[#1C1B1F]/60" aria-hidden />
          <span className="truncate group-hover:underline">{member.email}</span>
        </a>
        {member.phone ? (
          <a
            href={`tel:${member.phone.replace(/\s+/g, "")}`}
            className="group inline-flex items-center gap-[12px] text-[15px] leading-[24px] text-[#1C1B1F] transition-colors hover:text-[#212C60]"
          >
            <Phone className="h-[18px] w-[18px] flex-shrink-0 text-[#1C1B1F]/60" aria-hidden />
            <span className="group-hover:underline">{member.phone}</span>
          </a>
        ) : null}
        {member.linkedinUrl ? (
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-[12px] text-[15px] leading-[24px] text-[#1C1B1F] transition-colors hover:text-[#212C60]"
          >
            <LinkedInIcon className="h-[18px] w-[18px] flex-shrink-0 text-[#1C1B1F]/60" />
            <span className="group-hover:underline">{linkedinLabel}</span>
          </a>
        ) : null}
      </div>

      {member.practiceAreas.length > 0 ? (
        <div className="mt-[24px] border-t border-[#1C1B1F]/10 pt-[24px]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1C1B1F]/60">
            {expertiseLabel}
          </p>
          <ul className="mt-[12px] flex flex-wrap gap-[8px]">
            {member.practiceAreas.map((slug) => (
              <li key={slug}>
                <Link
                  href={{
                    pathname: "/calisma-alanlari/[slug]",
                    params: { slug },
                  }}
                  className="inline-flex items-center rounded-[2px] bg-[#212C60]/5 px-[12px] py-[6px] text-[13px] font-medium text-[#212C60] transition-colors hover:bg-[#212C60]/10"
                >
                  {practiceAreaTitles[slug]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}
