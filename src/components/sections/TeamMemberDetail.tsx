import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { TeamMember } from "@/types/content";
import { TeamMemberSidebar } from "./TeamMemberSidebar";
import { TeamMemberContent } from "./TeamMemberContent";

type Props = {
  member: TeamMember;
  backToTeamLabel: string;
  linkedinLabel: string;
  bandImageSrc?: string;
  eyebrows: {
    biography: string;
    education: string;
    memberships: string;
    languages: string;
  };
};

export function TeamMemberDetail({
  member,
  backToTeamLabel,
  linkedinLabel,
  bandImageSrc = "/images/hero/team-detail-hero.jpg",
  eyebrows,
}: Props) {
  return (
    <>
      <section className="relative -mt-[122px] min-h-[380px] w-full overflow-hidden bg-[#212C60] md:min-h-[440px]">
        <Image
          src={bandImageSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative mx-auto flex min-h-[380px] max-w-[1280px] flex-col justify-end px-[24px] pb-[32px] pt-[140px] md:min-h-[440px] md:px-[100px] md:pb-[48px] md:pt-[160px]">
          <h1 className="font-sans text-[32px] font-bold leading-[40px] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] md:text-[44px] md:leading-[52px]">
            {member.name}
          </h1>
          {member.position ? (
            <p className="mt-[8px] text-[14px] font-semibold uppercase tracking-[0.18em] text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] md:mt-[12px] md:text-[16px]">
              {member.position}
            </p>
          ) : null}
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-[24px] pt-[24px] md:px-[100px] md:pt-[32px]">
        <Link
          href="/team"
          className="inline-flex items-center gap-[8px] text-[14px] font-medium text-[#1C1B1F]/70 transition-colors hover:text-[#212C60]"
        >
          <ArrowLeft className="h-[16px] w-[16px]" aria-hidden />
          {backToTeamLabel}
        </Link>
      </div>

      <div className="mx-auto max-w-[1280px] px-[24px] pb-[40px] pt-[24px] md:px-[100px] md:pb-[56px] md:pt-[32px]">
        <div className="grid grid-cols-1 gap-[48px] md:grid-cols-[400px_1fr]">
          <TeamMemberSidebar member={member} linkedinLabel={linkedinLabel} />
          <TeamMemberContent member={member} eyebrows={eyebrows} />
        </div>
      </div>
    </>
  );
}
