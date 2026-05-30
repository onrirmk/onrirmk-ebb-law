"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
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

  const isActiveLink = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  // Close the menu if the user navigates while it's open.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const headerClass = isHome
    ? "absolute inset-x-0 top-0 z-30 h-[122px] w-full text-white"
    : "relative z-30 h-[122px] w-full bg-[#111827]/30 text-[#0F172A]";

  const linkColorClass = isHome ? "text-white" : "text-[#0F172A]";
  const toggleColorClass = isHome ? "text-white" : "text-[#0F172A]";

  return (
    <header className={headerClass}>
      <div className="relative mx-auto h-full w-full max-w-[1680px]">
        <Link
          href="/"
          className="absolute left-[24px] top-[31px] block md:left-[79px] md:top-[46px]"
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
          className="absolute right-[100px] top-[59px] hidden h-[24px] items-center md:flex"
        >
          <ul className="flex items-center gap-[36px]">
            {NAV_LINKS.map((link) => {
              const isActive = isActiveLink(link.href);
              return (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`font-sans text-[18px] font-medium leading-[28px] tracking-wide ${linkColorClass} transition-opacity hover:opacity-80 ${
                      isActive
                        ? "underline decoration-2 underline-offset-[10px]"
                        : ""
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className={`absolute right-[16px] top-[43px] inline-flex h-[40px] w-[40px] items-center justify-center p-[8px] md:hidden ${toggleColorClass}`}
        >
          <Menu className="h-[24px] w-[24px]" aria-hidden="true" />
        </button>
      </div>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!isOpen}
        className={`fixed inset-0 z-50 bg-white text-[#212C60] transition-opacity duration-300 ease-out md:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
          className="absolute right-[16px] top-[43px] inline-flex h-[40px] w-[40px] items-center justify-center p-[8px] text-[#212C60]"
        >
          <X className="h-[24px] w-[24px]" aria-hidden="true" />
        </button>

        <nav aria-label="Mobile" className="px-[24px] pt-[80px]">
          <ul className="flex flex-col gap-[24px]">
            {NAV_LINKS.map((link) => {
              const isActive = isActiveLink(link.href);
              return (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`font-sans text-[24px] font-medium leading-[32px] tracking-wide text-[#212C60] ${
                      isActive
                        ? "underline decoration-2 underline-offset-[8px]"
                        : ""
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
