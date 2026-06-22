import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  primaryButton: string;
};

export function HomeCta({
  eyebrow,
  title,
  description,
  primaryButton,
}: Props) {
  return (
    <section className="mt-[64px] w-full bg-[#212C60] text-white md:mt-[96px]">
      <div className="mx-auto max-w-[1680px] px-[24px] py-[64px] text-center md:px-[100px] md:py-[112px]">
        <p className="mx-auto max-w-[800px] text-[12px] font-semibold uppercase tracking-[0.28em] text-white/70 md:text-[14px]">
          {eyebrow}
        </p>
        <h2 className="mx-auto mt-[16px] max-w-[820px] font-sans text-[28px] font-bold leading-[36px] text-white md:mt-[20px] md:text-[36px] md:leading-[46px]">
          {title}
        </h2>
        <p className="mx-auto mt-[16px] max-w-[640px] text-[16px] leading-[26px] text-white/75 md:mt-[20px] md:text-[18px] md:leading-[28px]">
          {description}
        </p>

        <div className="mt-[32px] flex flex-wrap items-center justify-center gap-[16px] md:mt-[40px]">
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-[10px] rounded-[2px] bg-white px-[32px] py-[14px] text-[13px] font-semibold uppercase tracking-[0.18em] text-[#212C60] transition-colors hover:bg-white/90"
          >
            {primaryButton}
            <ArrowRight className="h-[16px] w-[16px]" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
