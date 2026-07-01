import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ChevronDown, Globe, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { NavLink } from "@/types/content";
import { fetchPracticeAreas, fetchSiteSettings } from "@/sanity/lib/queries";
import { imageSrc } from "@/sanity/lib/image";

const NAV_LINKS: NavLink[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/hakkimizda" },
  { key: "practiceAreas", href: "/calisma-alanlari" },
  { key: "team", href: "/team" },
  { key: "contact", href: "/iletisim" },
];

const PILL_CLASS =
  "mb-[12px] inline-block whitespace-nowrap rounded-[4px] bg-[#DEA356] px-[12px] py-[5px] font-sans text-[12px] font-bold uppercase tracking-wide text-white md:mb-[16px] md:px-[16px] md:py-[6px] md:text-[14px]";

const LINK_CLASS =
  `group relative inline-block text-[13px] font-medium leading-[24px] text-[#1C1B1F] transition-colors hover:text-[#212C60] md:text-[14px] md:leading-[28px]
   after:pointer-events-none after:absolute after:bottom-[2px] after:left-0 after:right-0 after:h-[1.5px] after:bg-[#212C60] after:origin-left after:scale-x-0
   after:transition-transform after:duration-[450ms] after:ease-[cubic-bezier(0.16,1,0.3,1)]
   hover:after:scale-x-100`;

const ICON_CLASS = "mt-[2px] h-[16px] w-[16px] shrink-0 text-[#212C60]";

const CONTACT_LINK_CLASS =
  "transition-colors hover:text-[#212C60] hover:underline";

export async function Footer() {
  const [t, settings, practiceAreas] = await Promise.all([
    getTranslations(),
    fetchSiteSettings(),
    fetchPracticeAreas(),
  ]);

  const year = new Date().getFullYear();
  const phone = settings?.phone ?? "";
  const fax = settings?.fax ?? "";
  const email = settings?.email ?? "";
  const web = settings?.web ?? "";
  const address = settings?.address ?? {};
  const footerLogoSrc = imageSrc(settings?.logoFooter);

  const phoneHref = phone ? `tel:${phone.replace(/\s/g, "")}` : undefined;
  const copyrightText = (settings?.footerCopy ?? "").replace(
    /\{year\}/g,
    String(year),
  );

  return (
    <footer className="bg-white text-[#1C1B1F]">
      <div className="mx-auto max-w-[1680px] px-[24px] md:px-[87px]">
        <div className="h-px bg-[#1C1B1F]/15" />

        <div className="grid grid-cols-1 gap-y-[24px] pt-[40px] lg:grid-cols-[auto_1fr_2fr_auto_1.5fr] lg:gap-x-[40px] lg:gap-y-0 lg:pt-[64px]">
          <div>
            <Image
              src={footerLogoSrc ?? "/images/logo/ebb-logo-footer.png"}
              alt={settings?.firmName ?? "Law Firm"}
              width={352}
              height={88}
              className="block h-[56px] w-auto md:h-[80px]"
            />
          </div>

          {/* Mobile only: accordion */}
          <div className="sm:hidden">
            <details className="group border-t border-[#1C1B1F]/10">
              <summary className="flex cursor-pointer list-none items-center justify-between py-[14px] [&::-webkit-details-marker]:hidden">
                <h3 className={`${PILL_CLASS} !mb-0`}>
                  {t("footer.exploreTitle")}
                </h3>
                <ChevronDown
                  className="h-[18px] w-[18px] text-[#212C60] transition-transform duration-200 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <ul className="pb-[8px]">
                {NAV_LINKS.map((link) => (
                  <li key={link.key}>
                    <Link href={link.href} className={LINK_CLASS}>
                      {t(`nav.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>

            <details className="group border-t border-[#1C1B1F]/10">
              <summary className="flex cursor-pointer list-none items-center justify-between py-[14px] [&::-webkit-details-marker]:hidden">
                <h3 className={`${PILL_CLASS} !mb-0`}>
                  {t("footer.practiceAreasTitle")}
                </h3>
                <ChevronDown
                  className="h-[18px] w-[18px] text-[#212C60] transition-transform duration-200 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <ul className="pb-[8px]">
                {practiceAreas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={{
                        pathname: "/calisma-alanlari/[slug]",
                        params: { slug: area.slug },
                      }}
                      className={`${LINK_CLASS} whitespace-nowrap`}
                    >
                      {area.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </div>

          {/* sm+ : plain nav blocks, side-by-side at sm/md, flattened into parent grid at lg */}
          <div className="hidden sm:grid sm:grid-cols-2 sm:gap-x-[32px] lg:contents">
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
              <ul>
                {practiceAreas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={{
                        pathname: "/calisma-alanlari/[slug]",
                        params: { slug: area.slug },
                      }}
                      className={`${LINK_CLASS} whitespace-nowrap`}
                    >
                      {area.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div
            className="hidden lg:block lg:w-px lg:bg-[#1C1B1F]/15"
            aria-hidden
          />

          <address className="not-italic">
            <div className="text-[13px] leading-[18px] text-[#1C1B1F] md:text-[14px] md:leading-[20px]">
              {phone ? (
                <div className="flex items-start gap-[8px]">
                  <Phone className={ICON_CLASS} aria-hidden />
                  <div>
                    <a
                      href={phoneHref}
                      aria-label={t("footer.callUs")}
                      className={CONTACT_LINK_CLASS}
                    >
                      {t("footer.phoneLabel")}: {phone}
                    </a>
                    {fax ? (
                      <div className="mt-[8px]">
                        {t("footer.faxLabel")}: {fax}
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {email ? (
                <div className="mt-[20px] flex items-start gap-[8px]">
                  <Mail className={ICON_CLASS} aria-hidden />
                  <a
                    href={`mailto:${email}`}
                    aria-label={t("footer.emailUs")}
                    className={CONTACT_LINK_CLASS}
                  >
                    {t("footer.emailLabel")}: {email}
                  </a>
                </div>
              ) : null}
              {web ? (
                <div className="mt-[8px] flex items-start gap-[8px]">
                  <Globe className={ICON_CLASS} aria-hidden />
                  <a
                    href={`https://${web}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("footer.visitWebsite")}
                    className={CONTACT_LINK_CLASS}
                  >
                    {t("footer.webLabel")}: {web}
                  </a>
                </div>
              ) : null}

              {address.line1 || address.line2 || address.line3 ? (
                <div className="mt-[20px] flex items-start gap-[8px]">
                  <MapPin className={ICON_CLASS} aria-hidden />
                  <div>
                    {address.line1 ? <div>{address.line1}</div> : null}
                    {address.line2 ? (
                      <div className="mt-[8px]">{address.line2}</div>
                    ) : null}
                    {address.line3 ? (
                      <div className="mt-[8px]">{address.line3}</div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          </address>
        </div>

        <div className="mt-[40px] border-t border-[#1C1B1F]/15 pb-[40px] pt-[24px]">
          <p className="text-[12px] text-[#1C1B1F]/60">
            {copyrightText || t("footer.copyright", { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
