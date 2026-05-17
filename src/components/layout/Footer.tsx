import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PRACTICE_AREA_SLUGS } from "@/i18n/routing";
import type { NavLink } from "@/types/content";

const NAV_LINKS: NavLink[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/hakkimizda" },
  { key: "practiceAreas", href: "/calisma-alanlari" },
  { key: "contact", href: "/iletisim" },
];

const PILL_CLASS =
  "mb-[16px] inline-block rounded-[4px] bg-[#DEA356] px-[16px] py-[6px] font-sans text-[14px] font-bold uppercase tracking-wide text-white";

const LINK_CLASS =
  "block text-[14px] font-medium leading-[28px] text-[#1C1B1F] transition-colors hover:text-[#212C60]";

const ICON_CLASS = "mt-[2px] h-[16px] w-[16px] shrink-0 text-[#212C60]";

const CONTACT_LINK_CLASS =
  "transition-colors hover:text-[#212C60] hover:underline";

export async function Footer() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  const phoneHref = `tel:${t("footer.phone").replace(/\s/g, "")}`;
  const webUrl = t("footer.webUrl");

  return (
    <footer className="bg-white text-[#1C1B1F]">
      <div className="mx-auto max-w-[1440px] px-[24px] md:px-[87px]">
        <div className="h-px bg-[#1C1B1F]/15" />

        <div className="grid grid-cols-1 gap-y-[32px] pt-[64px] md:grid-cols-[auto_1fr_2fr_auto_1.5fr] md:gap-x-[40px] md:gap-y-0">
          <div>
            <Image
              src="/images/logo/ebb-logo-footer.png"
              alt="Erçin Bilgin Bektaşoğlu Law Firm"
              width={352}
              height={88}
              className="block h-[80px] w-auto"
            />
          </div>

          <nav aria-label={t("footer.exploreTitle")}>
            <h3 className={PILL_CLASS}>{t("footer.exploreTitle")}</h3>
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className={LINK_CLASS}>
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("footer.practiceAreasTitle")}>
            <h3 className={PILL_CLASS}>{t("footer.practiceAreasTitle")}</h3>
            <ul className="md:columns-2 md:[column-gap:40px]">
              {PRACTICE_AREA_SLUGS.map((slug) => (
                <li key={slug} className="break-inside-avoid">
                  <Link
                    href={{
                      pathname: "/calisma-alanlari/[slug]",
                      params: { slug },
                    }}
                    className={LINK_CLASS}
                  >
                    {t(`practiceAreas.areas.${slug}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="hidden md:block md:w-px md:bg-[#1C1B1F]/15"
            aria-hidden
          />

          <address className="not-italic">
            <div className="text-[14px] leading-[20px] text-[#1C1B1F]">
              <div className="flex items-start gap-[8px]">
                <Phone className={ICON_CLASS} aria-hidden />
                <div>
                  <a
                    href={phoneHref}
                    aria-label={t("footer.callUs")}
                    className={CONTACT_LINK_CLASS}
                  >
                    {t("footer.phoneLabel")}: {t("footer.phone")}
                  </a>
                  <div className="mt-[8px]">
                    {t("footer.faxLabel")}: {t("footer.fax")}
                  </div>
                </div>
              </div>

              <div className="mt-[20px] flex items-start gap-[8px]">
                <Mail className={ICON_CLASS} aria-hidden />
                <a
                  href={`mailto:${t("footer.email")}`}
                  aria-label={t("footer.emailUs")}
                  className={CONTACT_LINK_CLASS}
                >
                  {t("footer.emailLabel")}: {t("footer.email")}
                </a>
              </div>
              <div className="mt-[8px] flex items-start gap-[8px]">
                <Globe className={ICON_CLASS} aria-hidden />
                <a
                  href={`https://${webUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("footer.visitWebsite")}
                  className={CONTACT_LINK_CLASS}
                >
                  {t("footer.webLabel")}: {webUrl}
                </a>
              </div>

              <div className="mt-[20px] flex items-start gap-[8px]">
                <MapPin className={ICON_CLASS} aria-hidden />
                <div>
                  <div>{t("footer.address.line1")}</div>
                  <div className="mt-[8px]">{t("footer.address.line2")}</div>
                  <div className="mt-[8px]">{t("footer.address.line3")}</div>
                </div>
              </div>
            </div>
          </address>
        </div>

        <div className="mt-[40px] border-t border-[#1C1B1F]/15 pb-[40px] pt-[24px]">
          <p className="text-[12px] text-[#1C1B1F]/60">
            {t("footer.copyright", { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
