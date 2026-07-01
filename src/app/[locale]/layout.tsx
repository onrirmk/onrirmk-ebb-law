import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { fetchSiteSettings } from "@/sanity/lib/queries";
import { imageSrc } from "@/sanity/lib/image";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const settings = await fetchSiteSettings();
  const navbarLogoSrc = imageSrc(settings?.logoNavbar) ?? "/images/logo/ebb-logo-navbar.png";
  const navbarLogoSolidSrc =
    imageSrc(settings?.logoFooter) ?? "/images/logo/ebb-logo-footer.png";
  const firmName = settings?.firmName ?? "Law Firm";

  return (
    <NextIntlClientProvider>
      <div className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[2px] focus:bg-white focus:px-4 focus:py-2 focus:text-[14px] focus:font-semibold focus:uppercase focus:tracking-[0.15em] focus:text-[#212C60] focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#212C60]"
        >
          Skip to main content
        </a>
        <Navbar
          logoSrc={navbarLogoSrc}
          logoSolidSrc={navbarLogoSolidSrc}
          firmName={firmName}
        />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
