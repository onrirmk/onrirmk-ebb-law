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

type NavbarProps = {
  logoSrc: string;
  logoSolidSrc?: string;
  firmName: string;
};

export function Navbar({ logoSrc, logoSolidSrc, firmName }: NavbarProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();

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

  // Pages that do not start with a dark hero band — navbar must be
  // solid from the first paint or the white text vanishes on white.
  const pageStartsSolid = /^\/team\/[^/]+/.test(pathname);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isSolid = scrolled || pageStartsSolid;

  const headerClass = `fixed inset-x-0 top-0 z-30 h-[122px] w-full transition-colors duration-300 ${
    isSolid
      ? "bg-white/95 shadow-[0_1px_0_rgba(28,27,31,0.08)] backdrop-blur"
      : "bg-transparent"
  } ${isSolid ? "text-[#212C60]" : "text-white"}`;

  const linkColorClass = isSolid ? "text-[#212C60]" : "text-white";
  const toggleColorClass = isSolid ? "text-[#212C60]" : "text-white";
  const underlineColorClass = isSolid ? "after:bg-[#212C60]" : "after:bg-white";

  return (
    <>
    <header className={headerClass}>
      <div className="relative mx-auto h-full w-full max-w-[1680px]">
        <Link
          href="/"
          className="absolute left-[24px] top-[31px] block lg:left-[79px] lg:top-[46px]"
          aria-label={firmName}
        >
          <Image
            src={isSolid && logoSolidSrc ? logoSolidSrc : logoSrc}
            alt={firmName}
            width={482}
            height={120}
            priority
            sizes="(min-width: 1024px) 322px, 240px"
            className="block h-[60px] w-auto lg:h-[80px]"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="absolute right-[100px] top-[59px] hidden h-[24px] items-center lg:flex"
        >
          <ul className="flex items-center gap-[36px]">
            {NAV_LINKS.map((link) => {
              const isActive = isActiveLink(link.href);
              return (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative inline-block font-sans text-[18px] font-medium leading-[28px] tracking-wide ${linkColorClass} transition-colors duration-300
                      after:pointer-events-none after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-[2px] ${underlineColorClass} after:origin-left
                      after:transition-transform after:duration-[450ms] after:ease-[cubic-bezier(0.16,1,0.3,1)]
                      ${isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}
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
          className={`absolute right-[16px] top-[43px] inline-flex h-[40px] w-[40px] items-center justify-center p-[8px] lg:hidden ${toggleColorClass}`}
        >
          <Menu className="h-[24px] w-[24px]" aria-hidden="true" />
        </button>
      </div>
    </header>

    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      hidden={!isOpen}
      className={`fixed inset-0 z-[60] bg-white text-[#212C60] transition-opacity duration-300 ease-out lg:hidden ${
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

      <nav aria-label="Mobile" className="px-[24px] pt-[120px]">
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
    </>
  );
}
