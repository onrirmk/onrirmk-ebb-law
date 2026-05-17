import type { TeamMember } from "@/types/content";

type Props = {
  member: TeamMember;
  eyebrows: {
    biography: string;
    education: string;
    memberships: string;
    languages: string;
  };
};

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1C1B1F]/60">
      {children}
    </p>
  );
}

export function TeamMemberContent({ member, eyebrows }: Props) {
  return (
    <div>
      <section>
        <Eyebrow>{eyebrows.biography}</Eyebrow>
        <div className="mt-[16px] space-y-[20px]">
          {member.bio.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-[18px] leading-[30px] tracking-[0.01em] text-[#1C1B1F]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {member.education.length > 0 ? (
        <section className="mt-[48px]">
          <Eyebrow>{eyebrows.education}</Eyebrow>
          <ul className="mt-[16px]">
            {member.education.map((item, idx) => (
              <li
                key={idx}
                className="mb-[12px] border-l-2 border-[#212C60]/20 py-[8px] pl-[16px]"
              >
                <p className="text-[14px] leading-[20px] text-[#1C1B1F]/60">
                  {item.year}
                </p>
                <p className="mt-[2px] text-[16px] font-medium leading-[24px] text-[#1C1B1F]">
                  {item.institution}
                </p>
                <p className="mt-[2px] text-[14px] leading-[20px] text-[#1C1B1F]/70">
                  {item.degree}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {member.memberships.length > 0 ? (
        <section className="mt-[48px]">
          <Eyebrow>{eyebrows.memberships}</Eyebrow>
          <ul className="mt-[16px] list-disc pl-[20px] marker:text-[#212C60]/40">
            {member.memberships.map((item, idx) => (
              <li
                key={idx}
                className="mb-[8px] text-[16px] leading-[24px] text-[#1C1B1F]"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {member.languages.length > 0 ? (
        <section className="mb-[80px] mt-[48px]">
          <Eyebrow>{eyebrows.languages}</Eyebrow>
          <p className="mt-[16px] text-[16px] leading-[24px] text-[#1C1B1F]">
            {member.languages.join(" · ")}
          </p>
        </section>
      ) : null}
    </div>
  );
}
