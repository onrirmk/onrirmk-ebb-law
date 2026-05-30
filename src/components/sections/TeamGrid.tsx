import type { TeamMember } from "@/types/content";
import { TeamMemberCard } from "./TeamMemberCard";

type Props = {
  members: TeamMember[];
  emailLabel: string;
};

export function TeamGrid({ members, emailLabel }: Props) {
  return (
    <section className="mx-auto max-w-[1680px] px-[24px] pb-[64px] pt-[16px] md:px-[100px] md:pb-[96px] md:pt-[24px]">
      <ul className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-[28px]">
        {members.map((member) => (
          <li key={member.email}>
            <TeamMemberCard member={member} emailLabel={emailLabel} />
          </li>
        ))}
      </ul>
    </section>
  );
}
