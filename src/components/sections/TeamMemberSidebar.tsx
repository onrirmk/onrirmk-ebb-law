import Image from "next/image";
import { UserCircle2, Mail, Phone } from "lucide-react";
import type { TeamMember } from "@/types/content";

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

type Props = {
  member: TeamMember;
  linkedinLabel: string;
};

export function TeamMemberSidebar({ member, linkedinLabel }: Props) {
  return (
    <aside className="md:sticky md:top-[120px] md:self-start">
      <div className="mx-auto max-w-[360px] overflow-hidden rounded-[8px] bg-white shadow-[0_10px_36px_rgba(28,27,31,0.10)] ring-1 ring-[#1C1B1F]/[0.06] md:mx-0 md:max-w-none">
        <div className="relative aspect-square w-full bg-[#EEF0F5]">
          {member.photoSrc ? (
            <Image
              src={member.photoSrc}
              alt={member.name}
              fill
              sizes="(min-width: 768px) 380px, 360px"
              className="object-cover"
              priority
            />
          ) : (
            <div
              aria-hidden
              className="absolute inset-0 flex items-center justify-center"
            >
              <UserCircle2
                className="h-[88px] w-[88px] text-[#1C1B1F]/25"
                strokeWidth={1}
              />
            </div>
          )}
        </div>
        <div className="px-[24px] pb-[22px] pt-[20px] md:px-[28px] md:pb-[24px] md:pt-[22px]">
          <h1 className="font-sans text-[22px] font-bold leading-[28px] text-[#212C60] md:text-[24px] md:leading-[30px]">
            {member.name}
          </h1>
          {member.position ? (
            <p className="mt-[6px] font-sans text-[12px] font-semibold uppercase leading-[18px] tracking-[0.16em] text-[#1C1B1F]/60 md:text-[13px]">
              {member.position}
            </p>
          ) : null}
          <div
            aria-hidden
            className="my-[14px] h-px w-[40px] bg-[#1C1B1F]/20 md:my-[16px]"
          />
          <div className="flex items-center gap-[14px]">
            {member.email ? (
              <a
                href={`mailto:${member.email}`}
                aria-label={member.email}
                className="text-[#1C1B1F]/55 transition-colors hover:text-[#212C60]"
              >
                <Mail className="h-[20px] w-[20px]" aria-hidden />
              </a>
            ) : null}
            {member.phone ? (
              <a
                href={`tel:${member.phone.replace(/\s+/g, "")}`}
                aria-label={member.phone}
                className="text-[#1C1B1F]/55 transition-colors hover:text-[#212C60]"
              >
                <Phone className="h-[20px] w-[20px]" aria-hidden />
              </a>
            ) : null}
            {member.linkedinUrl ? (
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={linkedinLabel}
                className="text-[#1C1B1F]/55 transition-colors hover:text-[#212C60]"
              >
                <LinkedInIcon className="h-[20px] w-[20px]" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </aside>
  );
}
