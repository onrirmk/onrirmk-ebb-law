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
      <section className="relative -mt-[122px] min-h-[280px] w-full overflow-hidden bg-[#212C60] md:min-h-[340px]">
        <Image
          src={bandImageSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative mx-auto max-w-[1280px] px-[24px] pb-[40px] pt-[140px] md:px-[100px] md:pb-[56px] md:pt-[160px]">
          <Link
            href="/team"
            className="inline-flex items-center gap-[8px] text-[14px] font-medium text-white/85 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-[16px] w-[16px]" aria-hidden />
            {backToTeamLabel}
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-[24px] py-[40px] md:px-[100px] md:py-[56px]">
        <div className="grid grid-cols-1 gap-[48px] md:grid-cols-[400px_1fr]">
          <TeamMemberSidebar member={member} linkedinLabel={linkedinLabel} />
          <TeamMemberContent member={member} eyebrows={eyebrows} />
        </div>
      </div>
    </>
  );
}
