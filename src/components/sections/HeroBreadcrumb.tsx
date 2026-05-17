import { Link } from "@/i18n/navigation";

type Props = {
  homeLabel: string;
  current: string;
};

export function HeroBreadcrumb({ homeLabel, current }: Props) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-[8px] font-sans text-[12px] font-medium text-white/75 md:text-[13px]">
        <li>
          <Link
            href="/"
            className="transition-colors duration-200 hover:text-white"
          >
            {homeLabel}
          </Link>
        </li>
        <li aria-hidden className="text-white/40">
          /
        </li>
        <li className="text-white">{current}</li>
      </ol>
    </nav>
  );
}
