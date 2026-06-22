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
    <>
      <div className="bg-[#212C60] text-white">
        <div className="mx-auto max-w-[1280px] px-[24px] pb-[20px] pt-[136px] md:px-[100px] md:pb-[24px] md:pt-[140px]">
          <Link
            href="/team"
            className="inline-flex items-center gap-[8px] text-[14px] font-medium text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-[16px] w-[16px]" aria-hidden />
            {backToTeamLabel}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-[24px] py-[40px] md:px-[100px] md:py-[56px]">
        <div className="grid grid-cols-1 gap-[48px] md:grid-cols-[400px_1fr]">
          <TeamMemberSidebar member={member} linkedinLabel={linkedinLabel} />
          <TeamMemberContent member={member} eyebrows={eyebrows} />
        </div>
      </div>
    </>
  );
}
