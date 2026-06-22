import { FadeIn } from "@/components/ui/FadeIn";

type Props = {
  title: string;
  paragraphs: string[];
};

export function WelcomeSection({ title, paragraphs }: Props) {
  return (
    <section className="mx-auto max-w-[1680px] px-[24px] pb-[48px] pt-[40px] md:pb-[64px] md:pl-[100px] md:pr-[260px] md:pt-[48px]">
      <FadeIn variant="slideUp">
        <h2 className="font-sans text-[28px] font-bold uppercase leading-[36px] tracking-wide text-primary">
          {title}
        </h2>
      </FadeIn>
      <div className="mt-[20px] space-y-6 text-[16px] font-normal leading-[26px] text-foreground/90 md:max-w-[1188px] md:text-[18px] md:leading-[30px]">
        {paragraphs.map((p, i) => (
          <FadeIn key={i} variant="slideUp" delay={120 + i * 80}>
            <p>{p}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
