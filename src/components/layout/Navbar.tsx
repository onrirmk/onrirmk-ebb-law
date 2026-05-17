"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { NavLink } from "@/types/content";

const NAV_LINKS: NavLink[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/hakkimizda" },
  { key: "practiceAreas", href: "/calisma-alanlari" },
  { key: "team", href: "/team" },
  { key: "contact", href: "/iletisim" },
];

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isHome = pathname === "/";

  const headerClass = isHome
    ? "absolute inset-x-0 top-0 z-30 h-[122px] w-full text-white"
    : "relative z-30 h-[122px] w-full border-b border-[#1C1B1F]/10 bg-white text-[#212C60]";

  const linkColorClass = isHome ? "text-white" : "text-[#212C60]";

  return (
    <header className={headerClass}>
      <div className="relative mx-auto h-full w-full max-w-[1440px]">
        <Link
          href="/"
          className="absolute left-[79px] top-[46px] block"
          aria-label="Erçin Bilgin Bektaşoğlu Law Firm"
        >
          <Image
            src="/images/logo/ebb-logo-navbar.png"
            alt="Erçin Bilgin Bektaşoğlu Law Firm"
            width={482}
            height={120}
            priority
            sizes="(min-width: 768px) 322px, 240px"
            className="block h-[60px] w-auto md:h-[80px]"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="absolute left-[861px] top-[59px] hidden h-[24px] items-center md:flex"
        >
          <ul className="flex items-center gap-[36px]">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className={`font-sans text-[18px] font-medium leading-[28px] tracking-wide ${linkColorClass} transition-opacity hover:opacity-80`}
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
