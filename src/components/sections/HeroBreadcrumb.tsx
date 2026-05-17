import { Link } from "@/i18n/navigation";

type Props = {
  homeLabel: string;
  current: string;
};

export function HeroBreadcrumb({ homeLabel, current }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="mb-[14px] md:mb-[18px]">
      <ol className="flex items-center justify-center gap-[10px] font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-white/70 md:text-[12px]">
        <li>
          <Link
            href="/"
            className="transition-colors duration-200 hover:text-white"
          >
            {homeLabel}
          </Link>
        </li>
        <li aria-hidden className="text-white/35">
          /
        </li>
        <li className="text-white/95">{current}</li>
      </ol>
    </nav>
  );
}
