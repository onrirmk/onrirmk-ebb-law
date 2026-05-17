"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type Props = {
  className?: string;
};

export function LanguageSwitcher({ className }: Props) {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const otherLocales = routing.locales.filter((l) => l !== locale);

  return (
    <nav
      aria-label={t("label")}
      className={
        className ??
        "flex items-center gap-2 text-sm font-medium uppercase tracking-wider"
      }
    >
      {otherLocales.map((target) => (
        <button
          key={target}
          type="button"
          onClick={() => {
            router.replace(
              // @ts-expect-error pathname is statically known canonical but params have dynamic shape
              { pathname, params },
              { locale: target }
            );
          }}
          className="cursor-pointer transition-opacity hover:opacity-80"
          aria-label={t(target)}
        >
          {target.toUpperCase()}
        </button>
      ))}
    </nav>
  );
}
