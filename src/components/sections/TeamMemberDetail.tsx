import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { PracticeAreaSlug } from "@/i18n/routing";
import type { TeamMember } from "@/types/content";
import { TeamMemberSidebar } from "./TeamMemberSidebar";
import { TeamMemberContent } from "./TeamMemberContent";

type Props = {
  member: TeamMember;
  backToTeamLabel: string;
  linkedinLabel: string;
  eyebrows: {
    expertise: string;
    biography: string;
    education: string;
    memberships: string;
    languages: string;
  };
  practiceAreaTitles: Record<PracticeAreaSlug, string>;
};

export function TeamMemberDetail({
  member,
  backToTeamLabel,
  linkedinLabel,
  eyebrows,
  practiceAreaTitles,
}: Props) {
  return (
    <div className="mx-auto max-w-[1280px] px-[24px] md:px-[100px]">
      <div className="mb-[40px] mt-[24px]">
        <Link
          href="/team"
          className="inline-flex items-center gap-[8px] text-[14px] font-medium text-[#212C60]/70 transition-colors hover:text-[#212C60]"
        >
          <ArrowLeft className="h-[16px] w-[16px]" aria-hidden />
          {backToTeamLabel}
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-[48px] md:grid-cols-[400px_1fr]">
        <TeamMemberSidebar
          member={member}
          expertiseLabel={eyebrows.expertise}
          linkedinLabel={linkedinLabel}
          practiceAreaTitles={practiceAreaTitles}
        />
        <TeamMemberContent
          member={member}
          eyebrows={{
            biography: eyebrows.biography,
            education: eyebrows.education,
            memberships: eyebrows.memberships,
            languages: eyebrows.languages,
          }}
        />
      </div>
    </div>
  );
}
