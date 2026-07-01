import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

type Props = {
  title: string;
  subtitle: string;
  button: string;
};

export function AboutCta({ title, subtitle, button }: Props) {
  return (
    <section className="mx-auto max-w-[1680px] px-[24px] pb-[80px] pt-[64px] md:pl-[100px] md:pr-[100px] md:pb-[120px] md:pt-[96px]">
      <div className="rounded-sm bg-[#212C60] px-[28px] py-[40px] text-white md:px-[56px] md:py-[56px]">
        <p className="max-w-[680px] font-sans text-[26px] font-bold leading-[34px] md:text-[32px] md:leading-[40px]">
          {title}
        </p>
        <p className="mt-[14px] max-w-[560px] text-[15px] leading-[24px] text-white/75 md:text-[16px] md:leading-[26px]">
          {subtitle}
        </p>
        <Link
          href="/iletisim"
          className="mt-[24px] inline-flex items-center gap-[10px] border-b border-white/40 pb-[4px] text-[13px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-white md:mt-[28px]"
        >
          {button}
          <ArrowRight className="h-[16px] w-[16px]" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
