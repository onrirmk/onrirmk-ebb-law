import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { TeamMember } from "@/types/content";
import { TeamMemberSidebar } from "./TeamMemberSidebar";
import { TeamMemberContent } from "./TeamMemberContent";

type Props = {
  member: TeamMember;
  backToTeamLabel: string;
  linkedinLabel: string;
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
  eyebrows,
}: Props) {
  return (
    <div className="mx-auto max-w-[1280px] px-[24px] pb-[48px] pt-[140px] md:px-[100px] md:pb-[72px] md:pt-[160px]">
      <Link
        href="/team"
        className="inline-flex items-center gap-[8px] text-[14px] font-medium text-[#1C1B1F]/70 transition-colors hover:text-[#212C60]"
      >
        <ArrowLeft className="h-[16px] w-[16px]" aria-hidden />
        {backToTeamLabel}
      </Link>
      <div className="mt-[20px] grid grid-cols-1 gap-[40px] md:mt-[32px] md:grid-cols-[380px_1fr] md:gap-[64px]">
        <TeamMemberSidebar member={member} linkedinLabel={linkedinLabel} />
        <TeamMemberContent member={member} eyebrows={eyebrows} />
      </div>
    </div>
  );
}
