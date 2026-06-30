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
import type { TeamMember } from "@/types/content";

type Props = {
  member: TeamMember;
  linkedinLabel: string;
};

export function TeamMemberSidebar({
  member,
  linkedinLabel,
}: Props) {
  return (
    <aside className="md:sticky md:top-[120px] md:self-start">
      <div className="relative mx-auto aspect-[3/4] w-full max-w-[300px] overflow-hidden bg-[#F5F5F5] md:mx-0 md:max-w-none">
        {member.photoSrc ? (
          <Image
            src={member.photoSrc}
            alt={member.name}
            fill
            sizes="(min-width: 768px) 400px, 300px"
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

      <div className="mt-[24px] flex flex-col gap-[12px]">
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

    </aside>
  );
}
