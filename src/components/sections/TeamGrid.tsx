import type { TeamMember } from "@/types/content";
import { TeamMemberCard } from "./TeamMemberCard";
import { FadeIn } from "@/components/ui/FadeIn";

type Props = {
  members: TeamMember[];
  emailLabel: string;
};

export function TeamGrid({ members, emailLabel }: Props) {
  return (
    <section className="mx-auto max-w-[1680px] px-[24px] pb-[64px] pt-[16px] md:px-[100px] md:pb-[96px] md:pt-[24px]">
      <ul className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-[28px]">
        {members.map((member, i) => (
          <li key={member.email}>
            <FadeIn variant="slideUp" delay={(i % 4) * 90}>
              <TeamMemberCard member={member} emailLabel={emailLabel} />
            </FadeIn>
          </li>
        ))}
      </ul>
    </section>
  );
}
