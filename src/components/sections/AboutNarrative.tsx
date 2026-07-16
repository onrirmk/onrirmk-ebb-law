import type { PortableTextBlock } from "@portabletext/react";
import { FadeIn } from "@/components/ui/FadeIn";
import { RichText } from "@/components/ui/RichText";

type Props = {
  title: string;
  paragraphs: PortableTextBlock[];
};

export function AboutNarrative({ title, paragraphs }: Props) {
  return (
    <section className="mx-auto max-w-[1680px] px-[24px] pt-[64px] md:pl-[100px] md:pr-[100px] md:pt-[96px]">
      <div className="md:max-w-[1188px]">
        <FadeIn variant="slideUp">
          <h2 className="font-sans text-[28px] font-bold leading-[36px] text-[#212C60] md:text-[32px] md:leading-[40px]">
            {title}
          </h2>
        </FadeIn>
        <div className="mt-[20px] space-y-[24px] md:mt-[24px] md:space-y-[28px]">
          <FadeIn variant="slideUp" delay={120}>
            <RichText value={paragraphs} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
